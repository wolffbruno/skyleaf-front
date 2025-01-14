import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Menu } from "@/components/menu";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      </head>
      <body className="dark antialiased">
        <header className="p-4 px-8 border-b border-border">
          <div className="flex justify-between items-center">
            <section className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-2xl font-medium tracking-tight cursor-pointer">skyleaf</h1>
              </Link>
              <Menu />
            </section>

            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/wolffbruno.png" />

            </Avatar>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
