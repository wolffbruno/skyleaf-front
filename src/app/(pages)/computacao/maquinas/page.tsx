"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthenticate, useNetworks, useServers, useFlavors, useImages, NOVA_BASE_URL } from "../../../hooks/useOpenStack";
import { SvgSpinners3DotsFade } from "../../application/page";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

export default function MaquinasPage() {
    const servers = useServers();
    const networks = useNetworks();
    const flavors = useFlavors();
    const images = useImages();
    const { token } = useAuthenticate();

    const [newVM, setNewVM] = useState({
        name: "",
        networkId: "",
        imageId: "",
        flavorId: ""
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewVM(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setNewVM(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${NOVA_BASE_URL}/v2.1/servers`, {
                server: {
                    name: newVM.name,
                    imageRef: newVM.imageId,
                    flavorRef: newVM.flavorId,
                    networks: [{ uuid: newVM.networkId }]
                }
            }, {
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/json'
                }
            });

            // You might want to update your servers list or show a success message here
            setIsDialogOpen(false); // Close the dialog after successful submission
        } catch (error) {
            console.error('Error creating VM:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="w-full flex flex-col bg-background justify-stretch min-h-screen gap-4 p-8 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium tracking-tight">Máquinas virtuais</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            Nova máquina virtual
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
                                <Input 
                                    type="text" 
                                    placeholder="Nome da máquina virtual" 
                                    name="name"
                                    value={newVM.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Select onValueChange={(value) => handleSelectChange("networkId", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma rede" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        networks.map(network => (
                                            <SelectItem key={network.id} value={network.id}>{network.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value) => handleSelectChange("imageId", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma imagem" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        images.map(image => (
                                            <SelectItem key={image.id} value={image.id}>{image.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value) => handleSelectChange("flavorId", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um flavor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        flavors.map(flavor => (
                                            <SelectItem key={flavor.id} value={flavor.id}>{flavor.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSubmit}>Criar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-x-auto ring-1 ring-border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="w-[200px]">Nome</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Flavor</TableHead>
                            <TableHead>IP</TableHead>
                            <TableHead className="w-[140px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!servers.length && <TableRow><TableCell colSpan={5} className="text-center">Nenhuma máquina virtual encontrada</TableCell></TableRow>}
                        {
                            servers.map(server => (
                                <TableRow key={server.id}>
                                    <TableCell className="font-medium">{server.name}</TableCell>
                                    <TableCell>
                                        <div className={`flex items-center gap-1 lowercase font-medium rounded-full px-2 border px-3 py-1 w-min leading-none ${server.status === 'ACTIVE' ? 'bg-emerald-950 border-emerald-600 text-emerald-200' :
                                            server.status === 'SHUTOFF' ? 'bg-red-950 border-red-600 text-red-200' :
                                                server.status === 'BUILD' ? 'bg-yellow-950 border-yellow-600 text-yellow-200' :
                                                    'bg-gray-950 border-gray-600 text-white'
                                            }`}>
                                            {server.status}

                                            {server.status === 'BUILD' && <SvgSpinners3DotsFade className="w-4 h-4 ml-2 text-current" />}
                                        </div>
                                    </TableCell>
                                    <TableCell><code>m1.small</code></TableCell>
                                    <TableCell><code>{server.addresses?.[0]?.[0]?.addr}</code></TableCell>
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
