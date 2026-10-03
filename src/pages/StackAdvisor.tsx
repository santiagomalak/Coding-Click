import { useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";
import { recomendar, type Respuestas } from "@/config/stack-advisor-reglas";
import { comboPacks, marketingPacks } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useSeo } from "@/lib/useSeo";

type Step = 0 | 1 | 2 | 3 | 4;

const questions: {
  key: keyof Respuestas;
  question: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "tieneWeb",
    question: "¿Tu negocio hoy tiene página web?",
    options: [
      { value: "no-tengo", label: "No tengo nada todavía" },
      { value: "vieja", label: "Tengo una web vieja o que no me convence" },
      { value: "funciona-bien", label: "Tengo web y funciona bien" },
    ],
  },
  {
    key: "necesidad",
    question: "¿Qué necesitás que haga la web?",
    options: [
      { value: "mostrar", label: "Mostrar mi negocio y que me contacten" },
      { value: "vender", label: "Vender productos online" },
      { value: "a-medida", label: "Algo a medida (sistema, reservas, gestión)" },
    ],
  },
  {
    key: "redes",
    question: "¿Cómo está tu presencia en redes sociales?",
    options: [
      { value: "no-publico", label: "No tengo o casi no publico" },
      { value: "sin-estrategia", label: "Publico de vez en cuando, sin estrategia" },
      { value: "quiero-mejorar", label: "Publico seguido pero quiero mejorar" },
      { value: "ya-tengo-manager", label: "Ya tengo quien me la maneja" },
    ],
  },
  {
    key: "urgencia",
    question: "¿Qué tan rápido lo necesitás?",
    options: [
      { value: "asap", label: "Lo antes posible" },
      { value: "1-2-meses", label: "En 1 a 2 meses" },
      { value: "sin-apuro", label: "Sin apuro, estoy evaluando" },
    ],
  },
];

export default function StackAdvisorPage() {
  useSeo({
    title: "Encontrá tu pack ideal",
    description: "Respondé unas preguntas rápidas y te recomendamos el pack de desarrollo y marketing que mejor se ajusta a tu negocio.",
    path: "/stack-advisor",
  });
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Partial<Respuestas>>({});

  const progress = Math.min(step, questions.length) / questions.length;

  function answer(key: keyof Respuestas, value: string) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setStep((s) => (s + 1) as Step);
  }

  const isResult = step >= questions.length;
  const recomendacion = isResult ? recomendar(answers as Respuestas) : null;
  const pack = recomendacion ? comboPacks.find((p) => p.id === recomendacion.packId) : null;

  return (
    <div className="min-h-[80vh] px-[5vw] py-24">
      <SectionLabel number="05" label="Stack Advisor" />
      <div className="mt-6 h-px w-full bg-line">
        <div className="h-px bg-accent transition-all duration-500 ease-section" style={{ width: `${progress * 100}%` }} />
      </div>

      {!isResult && (
        <div className="mt-16 max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl">{questions[step].question}</h1>
          <div className="mt-10 flex flex-col gap-3">
            {questions[step].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => answer(questions[step].key, opt.value)}
                className="border border-line px-6 py-4 text-left text-lg hover:border-accent hover:text-accent transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="mt-8 text-sm text-muted underline underline-offset-4 hover:text-accent"
            >
              ← Volver
            </button>
          )}
        </div>
      )}

      {isResult && pack && (
        <div className="mt-16 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.08em] text-accent">[ Te recomendamos ]</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">{pack.name}</h1>
          <p className="mt-4 text-muted">{pack.audience}</p>
          <p className="mt-2">{pack.includes}</p>
          {recomendacion?.incluyeMarketing && (
            <p className="mt-2 text-sm text-muted">
              Incluye marketing — nivel orientativo:{" "}
              {marketingPacks.find((m) => m.id === (answers.redes === "sin-estrategia" ? "crecimiento" : "completo"))?.name}
            </p>
          )}
          <p className="mt-8 text-xs text-muted">
            Esto es una orientación inicial — el detalle y el presupuesto final se confirman por WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              href={buildWhatsAppUrl(
                `Hola! Hice el Stack Advisor y me recomendó el pack ${pack.name}. Quiero más info.`
              )}
              external
            >
              Hablar por WhatsApp ↘
            </Button>
            <button
              onClick={() => {
                setStep(0);
                setAnswers({});
              }}
              className="border border-line px-5 py-3 text-sm uppercase tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              Volver a empezar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
