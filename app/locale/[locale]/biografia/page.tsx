// app/locale/[locale]/biografia/page.tsx
import BiografiaContent from "./BiografiaContent";

export const metadata = {
  title: "Claudia Cristina Company – Biografía",
  alternates: {
    canonical: "https://claudia-cristina-company.vercel.app/biografia",
    languages: {
      "es": "https://claudia-cristina-company.vercel.app/es/biografia",
      "en": "https://claudia-cristina-company.vercel.app/en/biografia",
      "fr": "https://claudia-cristina-company.vercel.app/fr/biografia",
    },
  },
  openGraph: {
    title: "Claudia Cristina Company – Biografía",
    url: "https://claudia-cristina-company.vercel.app/biografia",
    siteName: "Claudia Cristina Company",
    images: [
      {
        url: "https://tus-imagenes.com/og-biografia.jpg",
        width: 1200,
        height: 630,
        alt: "Claudia Cristina Company Biografía",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claudia Cristina Company – Biografía",
    images: ["https://tus-imagenes.com/og-biografia.jpg"],
  },
};

export default function Page({ params }: { params: { locale: string } }) {
  return <BiografiaContent locale={params.locale} />;
}