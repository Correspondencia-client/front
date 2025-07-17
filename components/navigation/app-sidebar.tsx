"use client";

import * as React from "react";
import Link from "next/link";

import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/common/logo";
import { useAuthStore } from "@/stores/auth-store";
import { NavMain } from "./nav-main";
import { routes } from "@/constants/navigation";
import { NavAdministration } from "./nav-administration";
import { NavAdministrationSkeleton } from "./skeletons/nav-administration-skeleton";
import { NavAdminRequest } from "./nav-admin-request";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  console.log(user?.area?.id)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-auto"
            >
              <Link href="#">
                <Logo
                  showName
                  logoClassname="size-7"
                  labelClassname="text-xl"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {!user ? (
          <NavAdministrationSkeleton size={2} />
        ) : user.role === "CITIZEN" ? (
          <NavMain items={routes.citizenNavMain} />
        ) : user.role === "OFFICER" || user.role === "ADMIN" ? (
          <NavMain items={routes.officerNavMain} />
        ) : (
          <NavMain items={routes.navMain} />
        )}

        {!user ? (
          <NavAdministrationSkeleton size={routes.administrationAdmin.length} />
        ) : user.role === "OFFICER" ? (
          <NavAdministration items={routes.administrationOfficer} />
        ) : user.role === "ADMIN" ? (
          <NavAdministration items={routes.administrationAdmin} />
        ) : (
          user.role === "SUPER" && (
            <NavAdministration items={routes.administrationSuperAdmin} />
          )
        )}

        {!user ? (
          <NavAdministrationSkeleton size={routes.navAdminRequest.length} />
        ) : (
          user.role === "ADMIN" &&
          user.area?.id !== undefined && (
            <NavAdminRequest items={routes.navAdminRequest} />
          )
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
