import { Section } from "./section";
import { Heading } from "../common/landing/heading";
import { Eye, Layout, ShieldCheck, Sparkles, Users } from "lucide-react";

const heading = {
  tag: "Compromiso",
  title: "Nuestros valores fundamentales",
  subtitle:
    "Comprometidos con la excelencia en el servicio público y la innovación tecnológica para un gobierno más cercano y eficiente.",
};

const featuresSideBySideList = {
  items: [
    {
      title: "Innovación constante",
      Icon: Sparkles,
      subtitle:
        "Implementamos tecnología de vanguardia para mejorar continuamente los servicios públicos y la experiencia ciudadana.",
    },
    {
      title: "Transparencia",
      Icon: Eye,
      subtitle:
        "Fomentamos la confianza a través de procesos claros y acceso a la información en todo momento.",
    },
    {
      title: "Seguridad de datos",
      Icon: ShieldCheck,
      subtitle:
        "Protegemos la información personal y los documentos con los más altos estándares de seguridad digital.",
    },
    {
      title: "Atención ciudadana",
      Icon: Users,
      subtitle:
        "Brindamos soporte y acompañamiento personalizado para resolver dudas y facilitar los trámites.",
    },
  ],
};

export function AboutUs() {
  return (
    <Section
    id="sobre-la-plataforma"
      className="relative lg:container lg:mx-auto lg:!flex-row lg:gap-0 lg:p-28"
      container="full"
    >
      <div className="container relative top-0 mx-auto shrink self-stretch px-6 lg:w-1/2 lg:pl-0 lg:pr-12 xl:pr-20">
        <div className="sticky bottom-0 top-[calc(var(--header-height)+40px)] flex flex-col gap-10">
          <Heading align="left" className="items-start" {...heading} />
        </div>
      </div>
      <div className="w-full flex-1 shrink-0 lg:w-1/2 lg:flex-1">
        <div className="no-scrollbar flex gap-10 overflow-auto px-6 lg:flex-col lg:px-0">
          {featuresSideBySideList.items.map(({ title, Icon, subtitle }) => (
            <article
              key={title}
              className="flex w-[280px] shrink-0 flex-col gap-4 rounded-lg border border-gray-300 bg-[#f3f4f6] p-4 lg:w-full lg:flex-row lg:p-5"
            >
              <figure className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#E4E4E7] p-3">
                <Icon />
              </figure>
              <div className="flex flex-col items-start gap-1">
                <h5 className="text-lg font-medium">{title}</h5>
                <p className="text-pretty text-[--text-tertiary] dark:text-[--dark-text-tertiary]">
                  {subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
