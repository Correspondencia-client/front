import Link from "next/link";
import { Logo } from "../common/logo";
import { navLinks } from "@/constants/landing";

export function Footer() {
  return (
    <footer className="w-full border-t bg-[#f9fafb] dark:bg-[--dark-surface-primary] py-10 px-6">
      {/* Main Footer */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo o ícono */}
        <div className="flex items-center gap-2">
          <Logo column={false} showName />
        </div>
        {/* Enlaces */}
        <nav className="flex flex-wrap justify-center gap-8 text-base text-[#6b7280] dark:text-[--dark-text-tertiary]">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Social y copyright */}
      <div className="text-[#6b7280] dark:text-[--dark-text-tertiary] text-center mt-4 text-sm">
        © {new Date().getFullYear()} Gestia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
