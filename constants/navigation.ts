import {
  Building,
  Building2,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

export const routes = {
  navMain: [
    {
      title: "Inicio",
      url: "/panel",
      icon: LayoutDashboardIcon,
    },
  ],
  administrationAdmin: [
    {
      name: "Gestión de areas",
      url: "/gestion-areas/admin",
      icon: Building,
    },
    {
      name: "Gestión de usuarios",
      url: "/gestion-usuarios/admin",
      icon: UsersIcon,
    },
  ],
  administrationSuperAdmin: [
    {
      name: "Gestión de areas",
      url: "/gestion-areas/superadmin",
      icon: Building,
    },
    {
      name: "Gestión de entidades",
      url: "/gestion-entidades/superadmin",
      icon: Building2,
    },
    {
      name: "Gestión de usuarios",
      url: "/gestion-usuarios/superadmin",
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/config",
      icon: SettingsIcon,
    },
    {
      title: "Soporte",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};
