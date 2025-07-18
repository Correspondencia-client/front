"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./section";
import { Heading } from "../common/landing/heading";

export const faqsItems = [
  {
    question: "¿Qué trámites puedo realizar en la plataforma?",
    answer:
      "Los tipos de trámite disponibles dependen de la configuración y servicios habilitados por cada entidad. Puedes consultar el catálogo de trámites al ingresar a la plataforma.",
  },
  {
    question: "¿Cómo puedo saber el estado de mi trámite?",
    answer:
      "Una vez iniciado el trámite, puedes hacer seguimiento en tiempo real desde tu panel de usuario. Además, recibirás notificaciones por correo electrónico sobre cualquier actualización.",
  },
  {
    question: "¿Es seguro ingresar mis datos personales?",
    answer:
      "Sí, la plataforma utiliza protocolos de seguridad avanzados y cumple con las normativas de protección de datos para garantizar la confidencialidad y seguridad de tu información.",
  },
  {
    question: "¿Qué debo hacer si tengo problemas con un trámite?",
    answer:
      "Puedes contactar al soporte técnico desde la sección de Ayuda o comunicarte directamente con la entidad responsable del trámite para recibir asistencia personalizada.",
  },
  {
    question:
      "¿Cómo puede mi entidad ofrecer trámites digitales en la plataforma?",
    answer:
      "Las entidades pueden solicitar acceso a la plataforma y configurar sus propios trámites digitales. Ofrecemos acompañamiento y capacitación para una integración exitosa.",
  },
  {
    question: "¿Qué beneficios tiene para las entidades usar esta plataforma?",
    answer:
      "Las entidades pueden optimizar procesos, reducir tiempos de atención, mejorar la transparencia y ofrecer una mejor experiencia a los ciudadanos mediante la digitalización de trámites.",
  },
  {
    question: "¿Puedo acceder a la plataforma desde mi celular?",
    answer:
      "Sí, la plataforma es responsiva y puedes acceder desde cualquier dispositivo, ya sea computadora, tablet o teléfono móvil.",
  },
  {
    question: "¿La plataforma tiene algún costo para los ciudadanos?",
    answer:
      "No, el uso de la plataforma para ciudadanos es gratuito.",
  },
];

function AccordionItem({
  question,
  answer,
  index,
  expanded,
  setExpanded,
}: {
  question: string;
  answer: string;
  index: number;
  expanded: boolean | number;
  setExpanded: (itemIndex: false | number) => void;
}) {
  const isOpen = index === expanded;

  return (
    <div
      className="py-7 border-b cursor-pointer"
      onClick={() => setExpanded(isOpen ? false : index)}
    >
      <div className="flex items-center">
        <p className="flex-1 text-[18px] font-medium select-none">{question}</p>
        {isOpen ? <Minus /> : <Plus />}
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          className="mt-4 select-none overflow-hidden text-[#71717A]"
          initial="collapsed"
          animate={isOpen ? "open" : "collapsed"}
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {answer}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const heading = {
  tag: "FAQS",
  title: "Preguntas frecuentes",
  subtitle: "Dudas más comunes sobre el uso de nuestra plataforma",
};

export function FAQs() {
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <Section id="faqs">
      <div className="container">
        <Heading {...heading} />
        <div className="mt-12 max-w-5xl mx-auto">
          {faqsItems.map(({ question, answer }, i) => (
            <AccordionItem
              key={i}
              question={question}
              answer={answer}
              index={i}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
