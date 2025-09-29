"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Gestão de Clientes",
    href: "/admin/clients",
    icon: Users,
    children: [
      { name: "Lista de Clientes", href: "/admin/clients" },
      { name: "Cadastrar Cliente", href: "/admin/clients/new" },
    ],
  },
  {
    name: "Financeiro",
    href: "/admin/financial",
    icon: CreditCard,
    children: [
      { name: "Pagamentos", href: "/admin/financial" },
      { name: "Novo Pagamento", href: "/admin/financial/new-payment" },
      { name: "Inadimplentes", href: "/admin/financial/overdue" },
      { name: "Relatórios", href: "/admin/financial/reports" },
    ],
  },
  {
    name: "Matrículas e Planos",
    href: "/admin/memberships",
    icon: UserCheck,
    children: [
      { name: "Matrículas", href: "/admin/memberships" },
      { name: "Gestão de Planos", href: "/admin/memberships/plans" },
      { name: "Nova Matrícula", href: "/admin/memberships/new" },
    ],
  },
  {
    name: "Operacional",
    href: "/admin/operations",
    icon: Wrench,
    children: [
      { name: "Visão Geral", href: "/admin/operations" },
      { name: "Equipamentos", href: "/admin/operations/equipment" },
      { name: "Manutenções", href: "/admin/operations/maintenance" },
      { name: "Log de Acessos", href: "/admin/operations/access-logs" },
    ],
  },
  {
    name: "Treinos e Avaliações",
    href: "/admin/training",
    icon: Dumbbell,
    children: [
      { name: "Visão Geral", href: "/admin/training" },
      { name: "Treinos", href: "/admin/training/workouts" },
      { name: "Novo Treino", href: "/admin/training/workouts/new" },
      { name: "Avaliações", href: "/admin/training/assessments" },
      { name: "Agendar Avaliação", href: "/admin/training/assessments/new" },
    ],
  },
  {
    name: "Relacionamento",
    href: "/admin/feedback",
    icon: MessageSquare,
  },
  {
    name: "Configurações",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isRouteActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const hasActiveChild = (children?: { href: string }[]) => {
    if (!children) return false;
    return children.some((child) => pathname === child.href);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <Link href={"/"} className="relative w-32 h-8">
              <Image
                src="/logo-arcfit-2.png"
                alt="ArcFit Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-foreground hover:cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 font-medium rounded-lg transition-all duration-200 group",
                  isRouteActive(item.href) || hasActiveChild(item.children)
                    ? "bg-primary text-primary-foreground shadow-sm border-l-4 border-primary-foreground/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md hover:scale-[1.02] hover:border-l-4 hover:border-primary/30"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-all duration-200",
                    isRouteActive(item.href) || hasActiveChild(item.children)
                      ? "text-primary-foreground"
                      : "group-hover:scale-110 group-hover:text-primary"
                  )}
                />
                {!collapsed && (
                  <span className="ml-3 truncate">{item.name}</span>
                )}
              </Link>
              {!collapsed && item.children && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "block px-3 py-1 text-sm rounded-md transition-all duration-200 relative",
                        pathname === child.href
                          ? "text-primary font-medium bg-primary/10 border-l-2 border-primary"
                          : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:translate-x-1 hover:border-l-2 hover:border-primary/50"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
