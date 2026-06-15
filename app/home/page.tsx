import Hero from "../components/Hero";
import About from "../components/About";
import Header from "../components/Header";
import Services from "../components/Services";
import GalleryPreview from "../components/GalleryPreview";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Link from "next/link";

// ⭐ METADATA SEO COMPLETA
export const metadata = {
  title: "Claudia Cristina Company – Inicio",
  
  alternates: {
    canonical: "https://claudia-cristina-company.vercel.app/home",
  },
  openGraph: {
    title: "Claudia Cristina Company – Inicio",
    url: "https://claudia-cristina-company.vercel.app/home",
    siteName: "Claudia Cristina Company",
    images: [
      {
        url: "https://tus-imagenes.com/og-image.jpg", // ← reemplaza con tu imagen real
        width: 1200,
        height: 630,
        alt: "Claudia Cristina Company",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claudia Cristina Company – Inicio",
    images: ["https://tus-imagenes.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ⭐ PÁGINA HOME OPTIMIZADA
export default function HomePage() {
  return (
    <main role="main">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <section aria-label="Sección principal de bienvenida">
        <Hero />
      </section>

      {/* ABOUT */}
      <section aria-labelledby="sobre-nosotros">
        <h2 id="sobre-nosotros" className="sr-only">
          Sobre nosotros
        </h2>
        <About />
      </section>

      {/* SERVICES */}
      <section aria-labelledby="servicios">
        <h2 id="servicios" className="sr-only">
          Nuestros servicios
        </h2>
        <Services />
      </section>

      {/* GALLERY PREVIEW */}
      <section aria-labelledby="galeria">
        <h2 id="galeria" className="sr-only">
          Galería de trabajos
        </h2>
        <GalleryPreview />

        <div className="text-center my-10">
          <Link
            href="/GaleriaPage"
            className="text-blue-600 underline hover:text-blue-800"
            aria-label="Ver galería completa"
          >
            {/* Puedes agregar texto si quieres */}
          </Link>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section aria-labelledby="testimonios">
        <h2 id="testimonios" className="sr-only">
          Testimonios de clientes
        </h2>
        <Testimonials />
      </section>

      {/* CALL TO ACTION */}
      <section aria-labelledby="cta">
        <h2 id="cta" className="sr-only">
          Agenda tu cita
        </h2>
        <CallToAction />
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
