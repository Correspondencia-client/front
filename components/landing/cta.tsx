import Link from "next/link";
import { Section } from "./section";

export function CallToAction() {
  return (
    <Section className="relative">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />
      <div
        className="w-full px-6 py-8 text-center z-[80]"
        // className="w-full rounded-2xl border bg-[#f9fafb] px-6 py-8 text-center shadow-sm z-[110]"
      >
        <h2 className="mb-4 text-4xl text-[clamp(28px,7vw,36px)] font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
          Potencia tu gestión
        </h2>
        <p className="text-md max-w-2xl text-pretty text-center text-[#6b7280] dark:text-[--dark-text-tertiary] md:text-lg mx-auto">
          Optimiza procesos y mejora la atención ciudadana con herramientas
          digitales diseñadas para entidades públicas.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 mt-6">
          <Link
            href="/contacto-entidades"
            className="rounded-full bg-primary px-4 py-2 font-medium text-white shadow transition hover:bg-primary/90"
          >
            Solicitar información
          </Link>
        </div>
      </div>
    </Section>
  );
}
