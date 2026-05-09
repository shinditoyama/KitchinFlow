"use client";

import { ChevronUp, LayoutDashboard, Pizza } from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const itensMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  //{ title: "Reservas", url: "/reservation", icon: CalendarDays },
  //{ title: "Cardápio", url: "/product", icon: UtensilsCrossed },
  //{ title: "Mapa do Salão", url: "/table", icon: Map },
  //{ title: "Delivery", url: "/delivery", icon: Truck },
  //{ title: "Cupons", url: "/coupon", icon: Tag },
  //{ title: "Relatórios", url: "/report", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <Pizza className="h-5 w-5" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-bold leading-none tracking-tight">
              Sabor & Bits
            </span>
            <span className="text-xs text-muted-foreground">Painel Admin</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 font-bold uppercase tracking-widest text-muted-foreground/70">
            Gerenciamento
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {itensMenu.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "transition-all duration-200 group-data-[collapsible=icon]:justify-center",
                        isActive
                          ? "bg-primary/10 text-primary hover:bg-primary/15 font-medium"
                          : "hover:bg-accent/50 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 w-full justify-start gap-3 hover:bg-accent rounded-xl px-3 transition-colors">
              <Avatar>
                <AvatarFallback className="text-xs font-bold bg-primary text-white">
                  JD
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start text-sm group-data-[collapsible=icon]:hidden">
                <span className="font-medium leading-none">João Dono</span>
                <span className="text-xs mt-1">Loja Aberta</span>
              </div>
              <ChevronUp className="ml-auto h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
