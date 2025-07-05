"use client"

import { Button } from '@/components/ui/button'
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");

      // Reset store statuses
      // useAuthStore.getState().clearUser();
      // useSchoolStore.getState().reset();

      // Delete persistent storage
      // localStorage.removeItem("auth-storage");
      // localStorage.removeItem("school-store");

      // Clear all cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });

      router.replace("/iniciar-sesion");
    } catch (error) {
      toast.error(
        "Error al cerrar sesión. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar sesión</Button>
    </div>
  )
}
