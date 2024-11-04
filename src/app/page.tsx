"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthenticate, useNetworks, useServers } from "./hooks/useOpenStack";
import { SvgSpinners3DotsFade } from "./(pages)/application/page";
import { CostChart } from "./charts/costs";
import { ErrorsChart } from "./charts/errors";
import { Card } from "@/components/ui/card";

export default function Home() {
  const servers = useServers();
  const networks = useNetworks();

  return (
    <div className="grid grid-cols-2 gap-4 p-8 font-sans">
      <div className="col-span-2 flex items-start justify-start">
        <Card>
          <div className="grid grid-cols-4 divide-x divide-border">
            <div className="p-4 flex flex-col gap-2">
              <span className="text-muted-foreground text-sm">Aplicações em execução</span>
              <h1 className="text-5xl font-medium">{servers.length || 0}</h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <span className="text-muted-foreground text-sm">Redes virtuais</span>
              <h1 className="text-5xl font-medium">{networks.length || 0}</h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <span className="text-muted-foreground text-sm">Máquinas virtuais</span>
              <h1 className="text-5xl font-medium">{servers.length || 0}</h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <span className="text-red-200 text-sm">Aplicações com erro</span>
              <h1 className="text-5xl font-medium text-red-400">{servers.filter(server => server.status === "ERROR").length || 0}</h1>
            </div>
          </div>
        </Card>
      </div>
      <CostChart />
      <ErrorsChart />
      <div className={`
        invisible 
        bg-amber-500 fill-amber-500 stroke-amber-500 text-amber-500
        bg-blue-500 fill-blue-500 stroke-blue-500 text-blue-500
        bg-emerald-500 fill-emerald-500 stroke-emerald-500 text-emerald-500
        bg-gray-500 fill-gray-500 stroke-gray-500 text-gray-500
        bg-indigo-500 fill-indigo-500 stroke-indigo-500 text-indigo-500
        bg-lime-500 fill-lime-500 stroke-lime-500 text-lime-500
        bg-orange-500 fill-orange-500 stroke-orange-500 text-orange-500
        bg-pink-500 fill-pink-500 stroke-pink-500 text-pink-500
        bg-purple-500 fill-purple-500 stroke-purple-500 text-purple-500
        bg-red-500 fill-red-500 stroke-red-500 text-red-500
        bg-rose-500 fill-rose-500 stroke-rose-500 text-rose-500
        bg-violet-500 fill-violet-500 stroke-violet-500 text-violet-500
        bg-yellow-500 fill-yellow-500 stroke-yellow-500 text-yellow-500
        
        `}></div>
    </div>
  );
}
