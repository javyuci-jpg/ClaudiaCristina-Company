// app/locale/[locale]/HomeContent.tsx
"use client";

import Hero from "../../components/Hero";
import About from "../../components/About";
import Services from "../../components/Services";
import GalleryPreview from "../../components/GalleryPreview";
import Testimonials from "../../components/Testimonials";
import CallToAction from "../../components/CallToAction";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ServicesCarousel from "../../components/ServicesCarousel";

export default function HomeContent({ locale }: { locale: string }) {
  const { t } = useTranslation("home");

  return (
    <main role="main" className="bg-[#F7F3EE] text-[#111111] font-[Inter]">
      {/* HERO */}
      <Hero locale={locale} />
      <section aria-label={t("heroSectionLabel")}>
       
      </section>

      {/* ABOUT */}
        <About locale={locale} />
      <section aria-labelledby="sobre-nosotros">
        <h2 id="sobre-nosotros" className="sr-only">
          {t("aboutSectionTitle")}
        </h2>
       
      </section>

    {/* SERVICES */}
     <ServicesCarousel locale={locale} />
<section aria-labelledby="servicios">
  <h2 id="servicios" className="sr-only">
    {t("servicesSectionTitle")}
  </h2>

</section>
      
      {/* GALLERY PREVIEW */}
   
        <GalleryPreview />
        

      {/* TESTIMONIOS */}
      <section aria-labelledby="testimonios">
        <h2 id="testimonios" className="sr-only">
          {t("testimonialsSectionTitle")}
        </h2>
        <Testimonials />
      </section>

      {/* CALL TO ACTION */}
      <section aria-labelledby="cta">
        <h2 id="cta" className="sr-only">
          {t("ctaSectionTitle")}
        </h2>
        <CallToAction />
      </section>
    </main>
  );
}
