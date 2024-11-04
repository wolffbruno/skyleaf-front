import { SidebarProvider } from "@/components/ui/sidebar";
import { ComputeSidebar } from "./sidebar";

export default function ComputacaoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
                <div className="flex">
                    <ComputeSidebar />
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
        </div>
    )
}
