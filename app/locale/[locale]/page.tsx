// app/locale/[locale]/page.tsx
import HomeContent from "./HomeContent";

// ⭐ METADATA SEO MULTILENGUAJE
export const metadata = {
  title: "Claudia Cristina Company – Inicio",
  alternates: {
    canonical: "https://claudia-cristina-company.vercel.app",
  },
  openGraph: {
    title: "Claudia Cristina Company – Inicio",
    url: "https://claudia-cristina-company.vercel.app",
    siteName: "Claudia Cristina Company",
    images: [
      {
        url: "https://tus-imagenes.com/og-image.jpg",
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

export default function Page({ params }: { params: { locale: string } }) {
  return <HomeContent locale={params.locale} />;
}
