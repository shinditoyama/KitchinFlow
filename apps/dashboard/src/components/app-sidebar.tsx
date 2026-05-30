"use client";

import {
  CalendarDaysIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  LayoutDashboardIcon,
  PizzaIcon,
  UtensilsCrossedIcon,
} from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/components/sidebar";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const itensMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboardIcon },
  // { title: "Cardápio", url: "/product", icon: UtensilsCrossed },
  { title: "Reservas", url: "/reservation", icon: CalendarDaysIcon },
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
            <PizzaIcon className="h-5 w-5" />
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
            <SidebarMenu className="space-y-1">
              {/* Item Simples: Dashboard */}
              {itensMenu.slice(0, 1).map((item) => {
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

              <Collapsible
                asChild
                defaultOpen={
                  pathname.startsWith("/product") ||
                  pathname.startsWith("/category")
                }
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Cardápio"
                      className="hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-all duration-200 group-data-[collapsible=icon]:justify-center"
                    >
                      <UtensilsCrossedIcon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        Cardápio
                      </span>
                      {/* Setinha que gira 90° quando aberto */}
                      <ChevronRightIcon className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {/* Subitem: Produtos */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/product"}
                          className={cn(
                            pathname === "/product"
                              ? "text-primary font-medium"
                              : "text-muted-foreground",
                          )}
                        >
                          <Link href="/product">Pratos</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* Subitem: Categorias */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/category"}
                          className={cn(
                            pathname === "/category"
                              ? "text-primary font-medium"
                              : "text-muted-foreground",
                          )}
                        >
                          <Link href="/category">Categorias</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Demais itens do Menu (Reservas e Delivery) */}
              {itensMenu.slice(1).map((item) => {
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
              <ChevronUpIcon className="ml-auto h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
