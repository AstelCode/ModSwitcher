"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserContext } from "@/hooks/UserContext";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { DASHBOARD_ROUTES } from "./lib/dashboardRoutes";
import { usePathname } from "next/navigation";

export function DashboardSidebar({ children }: { children?: React.ReactNode }) {
  const user = useUserContext();
  const pathName = usePathname();

  const routes = [DASHBOARD_ROUTES.USERS].filter((item) =>
    item.roles.includes(user!.role),
  );

  const activeRoute = routes.find(
    (item) => `/dashboard/${item.path}` === pathName,
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "12rem",
          "--sidebar-width-icon": "3.2rem",
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant="outline"
              className="[&_svg]:size-5 group-data-[collapsible=icon]:size-9!"
              asChild
            >
              <Link href="/explorer">
                <MoveLeft />
                Back to explorer
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <span className="text-base">Administration</span>
            </SidebarGroupLabel>
            <SidebarMenu>
              {routes.map((item) => {
                const isActive = pathName === `/dashboard/${item.path}`;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      className="[&_svg]:size-5 group-data-[collapsible=icon]:size-9!"
                      asChild
                      isActive={isActive}
                    >
                      <Link href={`/dashboard/${item.path}`}>
                        <item.Icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="relative pt-12">
        <header className="flex h-12 items-center border-b px-4 bg-card absolute top-0 w-full">
          <SidebarTrigger />
          <span className="ml-4 font-semibold">
            {activeRoute?.name ?? "My Dashboard"}
          </span>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
