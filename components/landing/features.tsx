"use client";

import React, { useState } from "react";
import { Section } from "./section";
import { Heading } from "../common/landing/heading";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

const heading = {
  tag: "Características",
  title: "Trámites sin filas",
  subtitle:
    "Descubre cómo nuestra plataforma puede ayudarte a gestionar tus trámites de manera eficiente, segura y sencilla.",
};

const featuresCardsListCiudadano = {
  items: [
    {
      _title: "Trámites 100% en línea",
      description:
        "Realiza todos tus trámites desde cualquier lugar, sin necesidad de acudir presencialmente a una oficina.",
      image: {
        src: "/images/feature-1.jpg",
        alt: "Trámites en línea",
      },
      characteristics: {
        items: [
          { _title: "Disponible 24/7" },
          { _title: "Acceso desde cualquier dispositivo" },
          { _title: "Sin filas ni esperas" },
        ],
      },
    },
    {
      _title: "Seguimiento y notificaciones",
      description:
        "Consulta el estado de tus solicitudes en tiempo real y recibe notificaciones automáticas sobre cada avance.",
      image: {
        src: "/images/feature-1.jpg",
        alt: "Seguimiento y notificaciones",
      },
      characteristics: {
        items: [
          { _title: "Alertas por correo" },
          { _title: "Historial de trámites" },
          { _title: "Transparencia en cada paso" },
        ],
      },
    },
    {
      _title: "Seguridad y protección de datos",
      description:
        "Tus datos personales y documentos están protegidos bajo los más altos estándares de seguridad digital.",
      image: {
        src: "/images/feature-1.jpg",
        alt: "Seguridad y protección de datos",
      },
      characteristics: {
        items: [
          { _title: "Cifrado de extremo a extremo" },
          { _title: "Cumplimiento de normativas de privacidad" },
          { _title: "Acceso seguro y autenticado" },
        ],
      },
    },
  ],
};

const featuresCardsListEntidades = {
  items: [
    {
      _title: "Gestión centralizada",
      description:
        "Administra y da seguimiento a todos los trámites ciudadanos desde un solo lugar.",
      image: {
        src: "/images/feature-1.jpg",
        alt: "Gestión centralizada",
      },
      characteristics: {
        items: [
          { _title: "Panel de control unificado" },
          { _title: "Asignación de tareas" },
          { _title: "Reportes en tiempo real" },
        ],
      },
    },
    {
      _title: "Comunicación eficiente",
      description:
        "Envía notificaciones y comunicados a los ciudadanos de manera rápida y segura.",
      image: {
        src: "/images/feature-1.jpg",
        alt: "Comunicación eficiente",
      },
      characteristics: {
        items: [
          { _title: "Notificaciones automáticas" },
          { _title: "Mensajería interna" },
          { _title: "Historial de comunicaciones" },
        ],
      },
    },
    {
      _title: "Cumplimiento normativo",
      description:
        "Asegura el cumplimiento de normativas y la protección de datos en todos los procesos.",
      image: {
        src: "/images/feature-1.jpg",
        alt: "Cumplimiento normativo",
      },
      characteristics: {
        items: [
          { _title: "Auditoría de procesos" },
          { _title: "Gestión de permisos" },
          { _title: "Protección de datos" },
        ],
      },
    },
  ],
};

export function Features() {
  const [tab, setTab] = useState<"ciudadano" | "entidades">("ciudadano");
  const featuresCardsList =
    tab === "ciudadano"
      ? featuresCardsListCiudadano
      : featuresCardsListEntidades;

  return (
    <Section container="default">
      <Heading {...heading} />
      <div className="mb-8 flex gap-2">
        <button
          className={`px-4 py-2 rounded-t font-medium border-b-2 ${
            tab === "ciudadano"
              ? "border-primary text-primary bg-white dark:bg-[--dark-surface-primary]"
              : "border-transparent text-gray-500 bg-transparent"
          }`}
          onClick={() => setTab("ciudadano")}
        >
          Ciudadano
        </button>
        <button
          className={`px-4 py-2 rounded-t font-medium border-b-2 ${
            tab === "entidades"
              ? "border-primary text-primary bg-white dark:bg-[--dark-surface-primary]"
              : "border-transparent text-gray-500 bg-transparent"
          }`}
          onClick={() => setTab("entidades")}
        >
          Entidades
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {featuresCardsList.items.map(({ image, ...item }) => (
          <article
            key={item._title}
            className="flex min-h-96 w-full max-w-[380px] flex-col rounded-lg border border-gray-300 bg-[#f3f4f6] p-px dark:bg-[--dark-surface-secondary] sm:max-w-full md:w-full md:flex-row md:odd:flex-row-reverse xl:gap-16"
          >
            <figure className="p-2 md:h-auto md:w-[360px] lg:w-[480px] xl:w-[560px]">
              <Image
                src={image.src}
                alt={image.alt}
                className="block aspect-video h-[200px] w-full rounded-lg border object-cover md:h-full"
                height={374}
                width={560}
              />
            </figure>
            <div className="flex flex-col gap-8 p-5 pt-6 md:flex-1 md:p-10">
              <div className="flex flex-col items-start gap-2">
                <h5 className="text-3xl font-medium text-[--text-primary] dark:text-[--dark-text-primary] md:text-3xl">
                  {item._title}
                </h5>
                <p className="font-normal text-[#52515B] md:text-lg">
                  {item.description}
                </p>
              </div>
              <ul className="flex flex-col items-start gap-3 pl-2 md:text-lg">
                {item.characteristics.items.map(({ _title }) => (
                  <li
                    key={_title}
                    className="flex items-center gap-4 font-normal text-[#52515B]"
                  >
                    <span className="flex p-1 items-center justify-center rounded-full bg-[#E4E4E7]">
                      <CheckIcon className="size-4 text-[#52515B]" />
                    </span>
                    {_title}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
