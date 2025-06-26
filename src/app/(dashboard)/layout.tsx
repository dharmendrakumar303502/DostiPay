"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Send,
  History,
  BarChart3,
  User,
  LogOut,
  ScanLine,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DostiPayLogo } from "@/components/dostipay-logo";
import { user } from "@/lib/mock-data";
import React from "react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/scan", label: "Scan & Pay", icon: ScanLine },
  { href: "/payment", label: "Send Money", icon: Send },
  { href: "/history", label: "History", icon: History },
  { href: "/insights", label: "Insights", icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const userInitial = user.name.split(' ').map(n => n[0]).join('');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="icon"
        >
          <SidebarHeader>
            <div className="flex items-center gap-2.5">
              <DostiPayLogo className="h-8 w-8" />
              <h1 className="text-lg font-semibold text-primary font-headline">DostiPay</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: "right" }}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: user.name, side: "right" }}>
                  <Link href="#">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person" />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{user.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: "Log Out", side: "right" }}>
                  <Link href="/login">
                    <LogOut />
                    <span>Log Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
