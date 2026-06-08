import "./globals.css";
import FloatingChat from "./components/FloatingChat";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Claudia",
  description: "Sitio web de Claudia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#F7F3EE]">
        <Providers>
          {children}
        </Providers>

        <FloatingChat />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}