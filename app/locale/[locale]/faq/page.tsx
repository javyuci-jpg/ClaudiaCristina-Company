"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "../../../components/SectionTitle";

// Componentes globales
import HeroGallery from "../../../components/HeroGallery";
import CallToAction from "../../../components/CallToAction";
import FloatingChat from "../../../components/FloatingChat";

export default function FAQPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = useTranslation("faq");

  const faqs = t("questions", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#F7F3EE] text-[#111111] font-[Inter]" role="main">

      {/* Hero */}
      <section aria-label={t("heroAlt")}>
        <HeroGallery
          title={t("heroTitle")}
          subtitle={t("heroSubtitle")}
          backgroundImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          height="55vh"
        />
      </section>

      {/* FAQ */}
      <section className="w-full py-12 bg-[#E8E1D9]" aria-labelledby="titulo-faq">
        <div className="max-w-7xl mx-auto px-6">
          <h1 id="titulo-faq" className="sr-only">
            {t("title")}
          </h1>

          <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
            <SectionTitle>{t("title")}</SectionTitle>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-[#F7F3EE] rounded-xl shadow-sm border border-[#E8E1D9] transition ${
                  index === faqs.length - 1 ? "md:col-span-2 mx-auto max-w-2xl" : ""
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-[#111111] focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                </button>

                <div
                  className={`px-6 pb-4 text-[#6B6B6B] font-montserrat leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <FloatingChat />
    </main>
  );
}
