"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" fillRule="evenodd" d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"></path></svg>
    )
}

export function SvgSpinners3DotsFade(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity" begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;.2"></animate></circle><circle cx="12" cy="12" r="3" fill="currentColor" opacity=".4"><animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s" values="1;.2"></animate></circle><circle cx="20" cy="12" r="3" fill="currentColor" opacity=".3"><animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.3s" dur="0.75s" values="1;.2"></animate></circle></svg>
    )
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

async function fetchRepoInfo(url: string) {
    try {
        const response = await fetch(`https://api.github.com/repos/${url.split('github.com/')[1]}`);
        if (!response.ok) {
            throw new Error('Repository not found');
        }
        const data = await response.json();
        return {
            name: data.name,
            description: data.description,
            stars: data.stargazers_count,
            forks: data.forks_count,
            language: data.language,
            avatarUrl: data.owner.avatar_url
        };
    } catch (error) {
        console.error('Error fetching repo info:', error);
        throw error;
    }
}

export default function ApplicationPage() {
    const router = useRouter();
    const [repoUrl, setRepoUrl] = useState("");
    const [repoInfo, setRepoInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [framework, setFramework] = useState("");

    useEffect(() => {
        const fetchRepo = async () => {
            if (repoUrl && repoUrl.includes('github.com/')) {
                try {
                    setLoading(true);
                    const info = await fetchRepoInfo(repoUrl);
                    setRepoInfo(info);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching repo info:', error);
                    setRepoInfo(null);
                    setLoading(false);
                }
            } else {
                setRepoInfo(null);
                setLoading(false);
            }
        };

        fetchRepo();
    }, [repoUrl]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepoUrl(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const applicationData = {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            name,
            framework,
            repoUrl,
            repoInfo
        };

        // Store in localStorage
        localStorage.setItem(`application_${applicationData.id}`, JSON.stringify(applicationData));

        // Redirect to the application detail page
        router.push(`/application/${applicationData.id}`);
    };

    return (
        <main className="flex flex-col items-start gap-4 p-4 px-8 mt-4">
            <h1 className="text-2xl font-medium tracking-tight">Nova aplicação</h1>

            <form onSubmit={handleSubmit} className="w-[440px] max-w-md flex flex-col gap-4">
                <div className="flex flex-col items-start gap-2">
                    <Label className="text-sm">Nome</Label>
                    <Input
                        type="text"
                        placeholder="Nome da aplicação"
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <Label className="text-sm">Framework</Label>
                    <Select value={framework} onValueChange={setFramework} required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um framework" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="auto">Auto detectar</SelectItem>
                            <SelectItem value="react">
                                <div className="flex items-center gap-2">
                                    <MdiReact className="w-4 h-4" />
                                    React
                                </div>
                            </SelectItem>
                            <SelectItem value="vue">
                                <div className="flex items-center gap-2">
                                    <MdiVuejs className="w-4 h-4" />
                                    Vue
                                </div>
                            </SelectItem>
                            <SelectItem value="node">
                                <div className="flex items-center gap-2">
                                    <MdiNodejs className="w-4 h-4" />
                                    Node
                                </div>
                            </SelectItem>
                            <SelectItem value="angular">
                                <div className="flex items-center gap-2">
                                    <MdiAngular className="w-4 h-4" />
                                    Angular
                                </div>
                            </SelectItem>
                            <SelectItem value="laravel">
                                <div className="flex items-center gap-2">
                                    <MdiLaravel className="w-4 h-4" />
                                    Laravel
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                        <GithubIcon className="w-4 h-4" />
                        <Label className="text-sm">URL do repositório</Label>
                    </div>

                    <div className="relative">
                        <Input
                            placeholder="URL do repositório Git"
                            value={repoUrl}
                            onChange={handleInputChange}
                            className="w-[440px]"
                            required
                        />
                        {loading && <SvgSpinners3DotsFade className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2" />}
                    </div>
                </div>

                {repoInfo && (
                    <div className="w-[440px] bg-black rounded-md text-foreground text-sm p-3 py-2 ring-1 ring-border/80">
                        <div className="flex items-start gap-2">
                            <Avatar className="w-4 h-4">
                                <AvatarImage src={repoInfo.avatarUrl} />
                                <AvatarFallback>
                                    <GithubIcon className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2">
                                <h2 className="font-medium leading-none">{repoInfo.name}</h2>
                                <span className="text-muted-foreground text-sm">{repoInfo.description}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 mt-12">
                    <Button type="submit">Deploy</Button>
                    <Button type="button" variant="outline" onClick={() => router.push('/')}>Cancelar</Button>
                </div>
            </form>
        </main>
    );
}
