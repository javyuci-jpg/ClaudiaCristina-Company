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

export default function HomeContent({ locale }: { locale: string }) {
  const { t } = useTranslation("home");

  return (
    <main role="main" className="bg-[#F7F3EE] text-[#111111] font-[Inter]">
      {/* HERO */}
      <section aria-label={t("heroSectionLabel")}>
        <Hero />
      </section>

      {/* ABOUT */}
      <section aria-labelledby="sobre-nosotros">
        <h2 id="sobre-nosotros" className="sr-only">
          {t("aboutSectionTitle")}
        </h2>
        <About />
      </section>

      {/* SERVICES */}
      <section aria-labelledby="servicios">
        <h2 id="servicios" className="sr-only">
          {t("servicesSectionTitle")}
        </h2>
        <Services />
      </section>

      {/* GALLERY PREVIEW */}
      <section aria-labelledby="galeria">
        <h2 id="galeria" className="sr-only">
          {t("gallerySectionTitle")}
        </h2>
        <GalleryPreview />

        <div className="text-center my-10">
          <Link
            href={`/${locale}/galeria`}
            className="text-blue-600 underline hover:text-blue-800"
            aria-label={t("galleryLinkLabel")}
          >
            {t("galleryLinkText")}
          </Link>
        </div>
      </section>

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
