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

import { Toggle } from "@/components/ui/toggle"

import { Home, NotebookPen, FileText, Settings, User, Moon } from "lucide-react";

import Link from "next/link";

const pages = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
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
        title: "Account",
        url: "/account",
        icon: User,
    },
]

export function AppSidebar() {
    return (
        <Sidebar variant="sidebar" >
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