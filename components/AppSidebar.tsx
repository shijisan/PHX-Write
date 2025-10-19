"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Home, NotebookPen, FileText, Settings, User, LogIn } from "lucide-react";

import Link from "next/link";
import { useSession } from "next-auth/react";


export function AppSidebar() {

    const { data: session } = useSession();


    const pages = [
        {
            title: "Notes",
            url: "/notes",
            icon: NotebookPen,
        },
        {
            title: "Docs",
            url: "/docs",
            icon: FileText,
        },
    ];

    const utilPages = [
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
        {
            title: session?.user ? "Account" : "Sign In",
            url: session?.user ? "/account" : "/auth",
            icon: session?.user ? User : LogIn,
        },
    ]


    return (
        <Sidebar>
            <SidebarHeader
                className="font-semibold px-4 pb-0"
            >
                PHX-Write
            </SidebarHeader>
            <SidebarContent
                className="px-2"
            >
                <SidebarGroup />
                <SidebarGroupLabel>
                    Pages
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {pages.map((page) => (
                            <SidebarMenuItem key={page.title}>
                                <SidebarMenuButton
                                    className="pl-4"
                                    asChild
                                >
                                    <Link href={page.url}>
                                        <page.icon />
                                        {page.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />

                <SidebarGroup />
                <SidebarGroupLabel>
                    Utils
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {utilPages.map((utilPage) => (
                            <SidebarMenuItem key={utilPage.title}>
                                <SidebarMenuButton
                                    className="pl-4"
                                    asChild
                                >

                                    <Link href={utilPage.url}>
                                        <utilPage.icon />
                                        {utilPage.title}
                                    </Link>

                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
        </Sidebar>
    )
}