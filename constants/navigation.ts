import {
  Building,
  Building2,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
  FileText,
  PlusCircle,
} from "lucide-react";

export const routes = {
  navMain: [
    {
      title: "Inicio",
      url: "/panel",
      icon: LayoutDashboardIcon,
    },
  ],
  citizenNavMain: [
    {
      title: "Inicio",
      url: "/panel",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Crear solicitud",
      url: "/solicitudes/ciudadano/nueva-solicitud",
      icon: PlusCircle,
    },
    {
      title: "Mis solicitudes",
      url: "/solicitudes/ciudadano/mis-solicitudes",
      icon: FileText,
    },
  ],
  officerNavMain: [
    {
      title: "Inicio",
      url: "/panel",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Crear solicitud externa",
      url: "/solicitudes/funcionario/nueva-solicitud",
      icon: PlusCircle,
    },
    {
      title: "Mis solicitudes externas",
      url: "/solicitudes/funcionario/mis-solicitudes",
      icon: FileText,
    },
  ],
  navMainAdminAndSuperAdmin: [
    {
      title: "Inicio",
      url: "/panel",
      icon: LayoutDashboardIcon,
    },
  ],
  administrationOfficer: [
    {
      name: "Solicitudes asignadas",
      url: "/solicitudes/funcionario/mis-asignaciones",
      icon: FileText,
    },
  ],
  administrationAdmin: [
    {
      name: "Gestión de usuarios",
      url: "/gestion-usuarios/admin",
      icon: UsersIcon,
    },
    {
      name: "Áreas y tipos de procesos",
      url: "/gestion-areas/admin",
      icon: Building,
    },
    {
      name: "Reportes",
      url: "/reportes",
      icon: FileText,
    },
  ],
  administrationSuperAdmin: [
    {
      name: "Gestión de áreas",
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
  navAdminRequest: [
    {
      name: "Solicitudes asignadas",
      url: "/solicitudes/funcionario/mis-asignaciones",
      icon: FileText,
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
