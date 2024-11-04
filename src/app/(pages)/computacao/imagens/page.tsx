"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useImages } from "../../../hooks/useOpenStack";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImagesPage() {
    const images = useImages();

    return (
        <div className="flex flex-col bg-background justify-stretch min-h-screen gap-4 p-8 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium tracking-tight">Images</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            Nova imagem
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Criar nova imagem
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4 flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label>Nome</Label>
                                <Input type="text" placeholder="Nome da imagem" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>URL da imagem</Label>
                                <Input type="url" placeholder="https://exemplo.com/imagem.qcow2" />
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
                            <TableHead>ID</TableHead>
                            <TableHead className="w-[140px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!images.length && <TableRow><TableCell colSpan={3} className="text-center">Nenhuma imagem encontrada</TableCell></TableRow>}
                        {
                            images.map(image => (
                                <TableRow key={image.id}>
                                    <TableCell className="font-medium">{image.name}</TableCell>
                                    <TableCell><code className="text-sm">{image.id}</code></TableCell>
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