"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFlavors } from "../../../hooks/useOpenStack";

export default function FlavorsPage() {
    const flavors = useFlavors();

    return (
        <div className="flex flex-col bg-background justify-stretch min-h-screen gap-4 p-8 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium tracking-tight">Flavors</h1>
            </div>
            <div className="overflow-x-auto ring-1 ring-border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="w-[200px]">Nome</TableHead>
                            <TableHead>vCPUs</TableHead>
                            <TableHead>RAM (MB)</TableHead>
                            <TableHead>Disco (GB)</TableHead>
                            <TableHead>Ephemeral</TableHead>
                            <TableHead>Swap</TableHead>
                            <TableHead className="w-[140px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!flavors.length && <TableRow><TableCell colSpan={7} className="text-center">Nenhum flavor encontrado</TableCell></TableRow>}
                        {
                            flavors.map(flavor => (
                                <TableRow key={flavor.id}>
                                    <TableCell className="font-medium">{flavor.name}</TableCell>
                                    <TableCell>{flavor.vcpus}</TableCell>
                                    <TableCell>{flavor.ram}</TableCell>
                                    <TableCell>{flavor.disk}</TableCell>
                                    <TableCell>{flavor.ephemeral}</TableCell>
                                    <TableCell>{flavor.swap}</TableCell>
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