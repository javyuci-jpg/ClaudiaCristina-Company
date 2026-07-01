// app/locale/[locale]/layout.tsx
import FloatingChat from "../../components/FloatingChat";
import { Providers } from "../../providers";
import { Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LanguageProvider from "../../components/LanguageProvider";

export const metadata = {
  title: "Claudia Cristina Company – Inicio",
  alternates: {
    canonical: "https://claudia-cristina-company.vercel.app",
  },
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body className="bg-[#F7F3EE]">
        {/* Sincroniza idioma en cliente */}
        <LanguageProvider locale={locale} />

        {/* Header único para todo el idioma */}
        <Header locale={locale} />

        {/* Providers envuelven el contenido para contextos globales */}
        <Providers>{children}</Providers>

        {/* Footer único para todo el idioma */}
        <Footer />

        {/* Extras globales */}
        <FloatingChat />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
