"use client";

import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { useParams } from "next/navigation";
import { SvgSpinners3DotsFade } from "../page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOVA_BASE_URL, OS_TOKEN, useFlavors, useImages, useNetworks, useServer, useServerLogs, useServers } from "@/app/hooks/useOpenStack";
import axios from "axios";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Step = {
    name: string;
    status: "pending" | "running" | "completed" | "failed";
    message?: string;
}

export function MdiReact(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a23 23 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16zm6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86c-.27-.06-.57-.11-.88-.16zm1.45-7.05c1.47.84 1.63 3.05 1.01 5.63c2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63c-1.46.84-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95c-1.46-.84-1.62-3.05-1-5.63c-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63c1.47-.84 3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26c2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26c-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16c-.07-.28-.18-.57-.29-.86zm-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7c.64-.35.83-1.82.32-3.96c-.77.16-1.58.28-2.4.36c-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16c.07.28.18.57.29.86zm2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a23 23 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9"></path></svg>
    )
}


export function MdiVuejs(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M2 3h3.5L12 15l6.5-12H22L12 21zm4.5 0h3L12 7.58L14.5 3h3L12 13.08z"></path></svg>
    )
}


export function MdiNodejs(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47c1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.65c-.08-.03-.16-.04-.21-.01c-.53.3-.63.36-1.12.51c-.12.04-.31.11.07.32l2.48 1.47q.36.21.78.21t.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c-2.12 0-3.39.89-3.39 2.39c0 1.61 1.26 2.08 3.3 2.28c2.43.24 2.62.6 2.62 1.08c0 .83-.67 1.18-2.23 1.18c-1.98 0-2.4-.49-2.55-1.47a.226.226 0 0 0-.22-.18h-.96c-.12 0-.21.09-.21.22c0 1.24.68 2.74 3.94 2.74c2.35 0 3.7-.93 3.7-2.55c0-1.61-1.08-2.03-3.37-2.34c-2.31-.3-2.54-.46-2.54-1c0-.45.2-1.05 1.91-1.05c1.5 0 2.09.33 2.32 1.36c.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07c.04-.04.07-.1.05-.16C17.56 8.82 16.38 8 14 8"></path></svg>
    )
}


export function MdiAngular(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m12 2.5l8.84 3.15l-1.34 11.7L12 21.5l-7.5-4.15l-1.34-11.7zm0 2.1L6.47 17h2.06l1.11-2.78h4.7L15.45 17h2.05zm1.62 7.9h-3.23L12 8.63z"></path></svg>
    )
}


export function MdiLaravel(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M21.7 6.53c.01.02.01.05.01.08v4.29c0 .1-.06.22-.15.27l-3.61 2.08v4.11c0 .11-.05.21-.15.27l-7.52 4.33c-.02.01-.04.04-.06.04H10s0-.03-.04-.04l-7.52-4.33a.32.32 0 0 1-.15-.27V4.5c0-.05 0-.08.01-.1c0-.01.01-.02.01-.03c0-.02.01-.03.02-.05c0-.01.01-.02.02-.03l.03-.03l.03-.03c.01-.01.02-.02.03-.02L6.2 2.04c.1-.04.22-.04.3 0l3.78 2.17c.01.01.02.01.03.02l.03.03l.03.03c.01.01.02.02.02.03c.01.02.02.03.02.05c0 .01.01.02.01.03c.01.03.01.05.01.1v8l3.14-1.78V6.61c0-.03 0-.06.01-.08l.01-.03s.01-.03.02-.05c0-.01.01-.02.02-.03l.03-.03l.03-.03c.01-.01.02-.02.03-.02l3.78-2.17c.08-.06.2-.06.3 0l3.76 2.17c.01 0 .02.01.03.02l.03.03l.03.03c.01.01.01.02.02.03c.01.02.01.05.02.05s.01 0 .01.03m-.61 4.19V7.15l-3.14 1.8v3.55zm-3.76 6.46V13.6l-6.9 3.94v3.61zM2.91 5v12.18l6.9 3.97v-3.61l-3.6-2.04H6.2c-.01 0-.02 0-.03-.03c-.01 0-.02-.01-.03-.02l-.03-.03c-.01-.01-.01-.02-.02-.03c-.01-.02-.01-.03-.02-.04c0-.02-.01-.03-.01-.04c-.01-.01-.01-.03-.01-.04V6.82zm3.45-2.32L3.23 4.5l3.13 1.78L9.5 4.5zm3.45 10.2V5L6.67 6.82v7.87zm7.83-8.08L14.5 6.61l3.14 1.8l3.13-1.8zm-.31 4.15l-3.14-1.8v3.57l3.14 1.78zM10.12 17L17 13.06l-3.12-1.8L7 15.23z"></path></svg>
    )
}

export default function ApplicationPage() {
    const flavors = useFlavors();
    const images = useImages();
    const networks = useNetworks();
    const [serverId, setServerId] = useState<string>();
    const server = useServer(serverId);
    const logs = useServerLogs(serverId);
    const { id } = useParams();

    const [creationStarted, setCreationStarted] = useState(false);

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [steps, setSteps] = useState<Step[]>([
        { name: "Coletando informações", status: "pending" },
        { name: "Criando máquinas", status: "pending" },
        { name: "Instalando dependências", status: "pending" },
        { name: "Configurando aplicação", status: "pending" },
        { name: "Iniciando serviços", status: "pending" }
    ]);

    const application = JSON.parse(localStorage.getItem(`application_${id}`) || "{}");

    const updateStep = (index: number, status: Step["status"], message?: string) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], status, message };
        setSteps(newSteps);

        // Update application in localStorage with new steps
        const updatedApplication = { ...application, steps: newSteps };
        localStorage.setItem(`application_${id}`, JSON.stringify(updatedApplication));
    };

    const createMachines = async () => {
        if (!flavors.length || !images.length) {
            throw new Error("No flavors or images available");
        }

        const flavor = flavors[1];
        const image = images.find(image => image.name === "ubuntu");

        if (!image) throw Error("image not found");

        const userDataString = `#!/bin/bash
# Update package list and install git
apt-get update
apt-get install -y git

# Clone a specific repository
git clone https://github.com/wolffbruno/vite.git /`;

        const userDataBase64 = Buffer.from(userDataString).toString("base64");

        const response = await axios.post(`${NOVA_BASE_URL}/v2.1/servers`, {
            server: {
                name: application.name,
                imageRef: image.id,
                flavorRef: flavor.id,
                networks: [{ uuid: networks[0].id }],
                user_data: userDataBase64,
            }
        }, {
            headers: {
                'X-Auth-Token': OS_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        setServerId(response.data.server.id);
    }

    useEffect(() => {
        if (!creationStarted && images.length && flavors.length && networks.length) {

            setCreationStarted(true);
            const createInfrastructure = async () => {
                try {
                    // Step 0: Collect information
                    updateStep(0, "running");
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    updateStep(0, "completed");
                    setCurrentStepIndex(0);

                    // Step 1: Create machines
                    updateStep(1, "running");
                    await createMachines();
                    updateStep(1, "completed");
                    setCurrentStepIndex(1);

                    // Step 3: Install dependencies
                    updateStep(2, "running");
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    updateStep(2, "completed");
                    setCurrentStepIndex(2);

                    // Step 3: Configure application
                    updateStep(3, "running");
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    updateStep(3, "completed");
                    setCurrentStepIndex(3);

                    // Step 4: Start services
                    updateStep(4, "running");
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    updateStep(4, "completed");
                    setCurrentStepIndex(4);

                } catch (error) {
                    const failedStepIndex = steps.findIndex(step => step.status === "running");
                    if (failedStepIndex !== -1) {
                        updateStep(failedStepIndex, "failed", "Ocorreu um erro durante a execução");
                    }
                }
            };

            createInfrastructure();
        }
    }, [images, flavors, networks, creationStarted])

    const currentStep = steps[currentStepIndex];

    return (
        <main className="flex flex-col items-start gap-4 mt-4">
            <div className="grid grid-cols-2 grid-rows-2 w-full">
                <section className="p-8 mb-8">
                    <div className="mb-8 flex gap-2 flex-col w-full">
                        {/* Replace the hardcoded icons with dynamic rendering based on framework */}
                        <div className="flex items-center gap-2">
                            {application.framework && (
                                <div className="flex gap-2">
                                    {application.framework === 'react' && <MdiReact className="w-6 h-6" />}
                                    {application.framework === 'vue' && <MdiVuejs className="w-6 h-6" />}
                                    {application.framework === 'node' && <MdiNodejs className="w-6 h-6" />}
                                    {application.framework === 'angular' && <MdiAngular className="w-6 h-6" />}
                                    {application.framework === 'laravel' && <MdiLaravel className="w-6 h-6" />}
                                </div>
                            )}
                            <h1 className="text-2xl font-medium tracking-tight leading-none">{application.name}</h1>
                        </div>
                        <div className="flex items-center gap-2 leading-none text-sm text-muted-foreground mt-1">
                            {currentStep.status !== "completed" && (
                                <SvgSpinners3DotsFade className="w-4 h-4" />
                            )}
                            {currentStep.status === "completed" && (
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {currentStep.status === "failed" && (
                                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                            {currentStep.name}
                            {currentStep.message && <span className="text-sm text-red-500">- {currentStep.message}</span>}
                        </div>
                    </div>


                    <div className="w-full grid grid-cols-2 gap-2 gap-y-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground font-medium">DNS Público</span>
                            {server?.status === 'ACTIVE' ? (
                                Object.entries(server.addresses).map(([network, addresses]) => (
                                    <div key={network}>
                                        <Link href={"https://7c3f-187-109-40-130.ngrok-free.app"} target="_blank">
                                            https://7c3f-187-109-40-130.ngrok-free.app
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="animate-pulse bg-muted h-4 w-24 rounded" />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground font-medium">IP Privado</span>
                            {server?.status === 'ACTIVE' ? (
                                Object.entries(server.addresses).map(([network, addresses]) => (
                                    <div key={network}>
                                        {/* @ts-ignore */}
                                        {addresses.map((addr: any) => (
                                            <p key={addr.addr} className="text-sm">{addr.addr}</p>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="animate-pulse bg-muted h-4 w-24 rounded" />
                            )}
                        </div>
                        <div className="flex flex-col gap-1 col-span-2">
                            <span className="text-sm text-muted-foreground font-medium">Repositório Git</span>
                            <span className="font-mono text-sm">{application.repoUrl}</span>
                        </div>
                    </div>
                </section>
                <section className="p-8">
                    <div className="flex flex-col gap-2">
                        {server?.status === 'ACTIVE' ? (
                            <iframe
                                src="https://7c3f-187-109-40-130.ngrok-free.app"
                                className="w-full h-[320px] rounded-lg border"
                            />
                        ) : (
                            <div className="bg-muted rounded-lg animate-pulse h-[320px] w-full" />
                        )}
                    </div>
                </section>
                <section className="col-span-2 border-t p-8">
                    <Tabs defaultValue="machines" className="w-full">
                        <TabsList>
                            <TabsTrigger value="machines">Máquinas</TabsTrigger>
                            <TabsTrigger value="logs">Logs</TabsTrigger>
                            <TabsTrigger value="settings">Configurações</TabsTrigger>
                        </TabsList>
                        <TabsContent value="machines">
                            <div className="h-[300px] overflow-hidden">
                                {server && (
                                    <div>
                                        <div className="rounded-lg border bg-card text-card-foreground">
                                            <div className="p-6 flex flex-col gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <svg className="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{server.name}</h3>
                                                        <p className="text-sm text-muted-foreground">Status: {server.status}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm font-medium">ID</p>
                                                        <p className="text-sm font-mono">{server.id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Endereços IP</p>
                                                        {server.status !== "ACTIVE" && (
                                                            <div className="flex items-center gap-2">
                                                                <SvgSpinners3DotsFade className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm text-muted-foreground">Carregando endereços...</span>
                                                            </div>
                                                        )}
                                                        {
                                                            Object.entries(server.addresses).map(([network, addresses]) => (
                                                                <div key={network}>
                                                                    {/* @ts-ignore */}
                                                                    {addresses.map((addr: any) => (
                                                                        <p key={addr.addr} className="text-sm">{addr.addr}</p>
                                                                    ))}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Button className="mt-4" variant={"outline"}>+ Adicionar máquinas</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="logs">
                            <div className="h-[300px] overflow-hidden">
                                <Card className="p-2">
                                    <ScrollArea className="h-[300px] font-mono">
                                        {/* @ts-ignore */}
                                        {logs.map((log, index) => (
                                            <p key={index} className="text-sm">{log}</p>
                                        ))}
                                    </ScrollArea>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
        </main>
    );
}
