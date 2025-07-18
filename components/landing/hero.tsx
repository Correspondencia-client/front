import { cn } from "@/lib/utils";
import { TrackedButton } from "../common/landing/tracket-button-link";

const actions = [
  {
    _id: "1",
    href: "/registrarse",
    label: "Regístrate gratis",
    type: "secondary",
  },
  {
    _id: "2",
    href: "/demo",
    label: "Solicita una demo",
    type: "primary",
  },
];

export function Hero() {
  return (
    <section className="arial-font relative min-h-[calc(630px-var(--header-height))] overflow-hidden pb-10">
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b">
        {/* Decorations */}
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>
      {/* --- */}
      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-primary/40 blur-[200px]" />
      <figure className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full bg-[#f9fafb] opacity-50 blur-[100px] dark:bg-[--dark-surface-primary] md:block" />
      <figure className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full bg-[#f9fafb] opacity-50 blur-[100px] dark:bg-[--dark-surface-primary] md:block" />
      {/* --- */}
      <div className="relative z-10 flex flex-col divide-y divide-[--border] pt-[35px] dark:divide-[--dark-border]">
        <div className="flex flex-col items-center justify-end">
          <div className="flex items-center gap-2 !border !border-b-0 border-[--border] px-4 py-2">
            <span className="text-xl">🚀</span>
            <p className="text-sm tracking-tight text-[#6b7280] dark:text-[--dark-text-tertiary]">
              Trámites públicos, ahora más simples
            </p>
          </div>
        </div>
        <div>
          <div className="mx-auto flex min-h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-6 px-2 py-4 sm:px-16 lg:px-24">
            <h1 className="!max-w-screen-lg text-pretty text-center text-[clamp(32px,7vw,64px)] font-medium leading-none tracking-[-1.44px] text-[--text-primary] dark:text-[--dark-text-primary] md:tracking-[-2.16px]">
              Tu canal directo con las organizaciones
            </h1>
            <h2 className="text-md max-w-2xl text-pretty text-center text-[#6b7280] dark:text-[--dark-text-tertiary] md:text-lg">
              Simplifica tus trámites, obtén respuestas rápidas y mantente
              conectado con el sector público a través de nuestra plataforma
              digital.
            </h2>
          </div>
        </div>
        <div className="flex items-start justify-center px-8 sm:px-24">
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[392px]">
            {actions.map(({ href, label, type, _id }) => (
              <TrackedButton
                key={_id}
                className={cn(
                  "!h-14 flex-col items-center justify-center rounded-none !text-base",
                  type === "primary"
                    ? "bg-primary text-primary-foreground w-full hover:bg-primary/90"
                    : "max-w-sm:!border-x-0 flex w-full !border-x !border-y-0 border-[--border] !bg-transparent backdrop-blur-xl transition-colors duration-150 hover:!bg-black/5 dark:hover:!bg-white/5"
                )}
                href={href}
                name="cta_click"
              >
                {label}
              </TrackedButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
