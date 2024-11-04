"use client";

import useSWR from 'swr';
import axios from "axios";
import zod from "zod";
import { headers } from 'next/headers';

// Define the base URL for your OpenStack API
const BASE_URL = 'http://192.168.56.101';


export const OS_TOKEN = "gAAAAABnKBB6mCC6WgQlh_Lun1_mxasPJJE2hFOReElc1gqtiGVxB7dFGbDVMvcr0E5L5TiX1A4z1S7U9MPFCAvap617sq6Wlc33XBy5FFpoJkD1sSILKZXL3rT6lRwWjA0SiBuEqcCNLlUT7IUzbELlgkaYwedYGPx8hdFEK8ytSJAzvRxBYuM";
export const NEUTRON_BASE_URL = "https://7971-187-109-40-130.ngrok-free.app"
export const NOVA_BASE_URL = "https://94dd-187-109-40-130.ngrok-free.app"

// Authentication function
const authenticate = async () => {
  /* const response = await fetch(`${BASE_URL}:5000/v3/auth/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "auth": {
        "identity": {
          "methods": [
            "password"
          ],
          "password": {
            "user": {
              "name": "admin",
              "domain": {
                "id": "default"
              },
              "password": "Axfme3HX2xeYsn2w5bS8KzDC5hSphg3pVe8fMRaS"
            }
          }
        },
        "scope": {
          "project": {
            "name": "admin",
            "domain": {
              "id": "default"
            }
          }
        }
      }
    }),
  });
 */
  const token = OS_TOKEN;

  return token;
};

// Hook for authentication
export function useAuthenticate() {
  const { data: token, error, mutate } = useSWR('auth-tokens', () => authenticate(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { token, error };
}

// Fetch function to be used with SWR
const fetcher = async (url: string) => {
  const token = await authenticate();

  if (!token) return;

  if (!token) {
    throw new Error('No authentication token available');
  }

  const response = await fetch(url, {
    headers: {
      'X-Auth-Token': token,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export function useServers() {
  const { data } = useSWR(`${NOVA_BASE_URL}/v2.1/servers/detail`, fetcher, { refreshInterval: 1000 });

  const ServersSchema = zod.array(zod.object({
    id: zod.string(),
    name: zod.string(),
    status: zod.enum(["ACTIVE", "BUILD", "REBOOT", "RESCUE", "SHUTOFF", "SUSPENDED", "UNKNOWN", "VERIFY_RESIZE", "ERROR"]),
    addresses: zod.record(zod.array(zod.object({
      addr: zod.string(),
      version: zod.number(),
    }))),
  }))

  const { servers } = data || {
    servers: []
  };
  const parsedServers = ServersSchema.parse(servers);

  return parsedServers;;
}

export function useNetworks() {
  const { data } = useSWR(`${NEUTRON_BASE_URL}/v2.0/networks`, fetcher, { refreshInterval: 1000 });

  const NetworksSchema = zod.array(zod.object({
    id: zod.string().uuid(),
    name: zod.string(),
    shared: zod.boolean().optional(),
    external: zod.boolean().optional(),
    status: zod.enum(["ACTIVE", "DOWN"]),
    availability_zones: zod.array(zod.string()),
  }))

  const { networks } = data || {
    networks: []
  }

  return NetworksSchema.parse(networks);
}

export function useFlavors() {
  const { data } = useSWR(`${NOVA_BASE_URL}/v2.1/flavors`, fetcher, { refreshInterval: 1000 });

  const FlavorsSchema = zod.array(zod.object({
    id: zod.string(),
    name: zod.string(),
    vcpus: zod.number().optional(),
    ram: zod.number().optional(),
    disk: zod.number().optional(),
    ephemeral: zod.number().optional(),
    swap: zod.number().optional(),
    rxtx_factor: zod.number().optional(),
  }))

  const { flavors } = data || {
    flavors: []
  }

  return FlavorsSchema.parse(flavors);
}

export function useImages() {
  const { data } = useSWR(`${NOVA_BASE_URL}/v2/images`, fetcher, { refreshInterval: 1000 });

  const ImagesSchema = zod.array(zod.object({
    id: zod.string().uuid(),
    name: zod.string(),
  }))

  const { images } = data || {
    images: []
  }

  return ImagesSchema.parse(images);
}

export function useServer(id?: string) {
  const { data } = useSWR(id ? `${NOVA_BASE_URL}/v2.1/servers/${id}` : null, fetcher, { refreshInterval: 1000 });
  console.info(data);
  return data?.server;
}

export function useServerLogs(id?: string) {
  const { data } = useSWR(
    id ? `${NOVA_BASE_URL}/v2.1/servers/${id}/action` : null,
    async (url) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Auth-Token': OS_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "os-getConsoleOutput": {
            length: 50 // Get last 50 lines
          }
        })
      });
      return response.json();
    },
    { refreshInterval: 5000 }
  );

  return data?.output?.split("\n") || [];
}
