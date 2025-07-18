import Link from "next/link";
import {
  DesktopMenu,
  MobileMenu,
} from "@/components/common/landing/navigation-menu";
import { Logo } from "@/components/common/logo";

export const Header = () => {
  const navLinks = [
    { title: "Inicio", href: "/" },
    { title: "Productos", href: "/productos" },
    { title: "Servicios", href: "/servicios" },
    { title: "Contacto", href: "/contacto" },
  ];

  const buttons = [
    {
      label: "Iniciar sesión",
      href: "/iniciar-sesion",
      variant: "secondary" as "secondary",
    },
    {
      label: "Registrarse",
      href: "/registrarse",
      variant: "primary" as "primary",
    },
  ];

  return (
    <header className="arial-font sticky left-0 top-0 z-[110] flex w-full flex-col border-b bg-background">
      <div className="flex h-[64px] bg-background">
        <div className="container mx-auto grid grid-cols-[1fr_max-content_1fr] place-items-center content-center items-center px-6">
          <Link href="#hero">
            <Logo column={false} showName />
          </Link>
          <DesktopMenu links={navLinks} buttons={buttons} />
          <MobileMenu links={navLinks} buttons={buttons} />
        </div>
      </div>
    </header>
  );
};
