"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";


const items = [
    {
        title: "Máquinas virtuais",
        path: "/computacao/maquinas",
    },
    {
        title: "AMI",
        path: "/computacao/imagens",
    },
    {
        title: "Flavors",
        path: "/computacao/flavors",
    },
    {
        title: "Volumes",
        path: "/computacao/volumes",
    },
    {
        title: "Grupos de segurança",
        path: "/computacao/grupos-de-seguranca",
    },
    {
        title: "Containers",
        path: "/computacao/containers",
    },
    {
        title: "Kubernetes",
        path: "/computacao/kubernetes",
    },
]

export function ComputeSidebar() {
    return (
        <div className="w-64 bg-sidebar-background p-4 border-r border-border">
            <ul className="w-full">
                {items.map((item) => (
                    <li key={item.title} className="text-sm w-full">
                        <Button variant="ghost" size="sm" className="w-full text-left">
                            <Link href={item.path} className="w-full text-left inline">{item.title}</Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
