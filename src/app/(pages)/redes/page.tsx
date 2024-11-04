"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthenticate, useNetworks, useServers } from "../../hooks/useOpenStack";
import { SvgSpinners3DotsFade } from "../application/page";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RedesPage() {
    const networks = useNetworks();

    return (
        <div className="flex flex-col bg-background justify-stretch min-h-screen gap-4 p-8 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium tracking-tight">Redes</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            Nova rede
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Criar nova máquina virtual
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4 flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label>Nome</Label>
                                <Input type="text" placeholder="Nome da máquina virtual" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Criar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-x-auto ring-1 ring-border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="w-[200px]">Nome</TableHead>
                            <TableHead>Compartilhada</TableHead>
                            <TableHead>Externa</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Zonas de disponibilidade</TableHead>
                            <TableHead className="w-[140px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!networks.length && <TableRow><TableCell colSpan={6} className="text-center">Nenhuma rede encontrada</TableCell></TableRow>}
                        {
                            networks.map(network => (
                                <TableRow key={network.id}>
                                    <TableCell className="font-medium">{network.name}</TableCell>
                                    <TableCell>{network.shared ? 'Sim' : 'Não'}</TableCell>
                                    <TableCell>{network.external ? 'Sim' : 'Não'}</TableCell>
                                    <TableCell>{network.status}</TableCell>
                                    <TableCell>{network.availability_zones.join(', ')}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">Detalhes</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
