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
      <div className="w-full px-6 py-8 text-center z-[80]">
        <h2 className="text-primary mb-4 text-4xl text-[clamp(28px,7vw,36px)] font-semibold">
          Potencia tu gestión
        </h2>
        <p className="text-md max-w-2xl text-pretty text-center text-[#6b7280] dark:text-[--dark-text-tertiary] md:text-lg mx-auto">
          Agiliza la gestión de trámites y mejora la experiencia de tus usuarios
          con soluciones digitales intuitivas y seguras.
        </p>
      </div>
    </Section>
  );
}
