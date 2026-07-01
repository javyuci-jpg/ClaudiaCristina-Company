import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="relative bg-[#F7F3EE] text-[#111111] font-[Inter]">
        {/* Fondo global con silueta de bailarina */}
        <div
          className="fixed inset-0 opacity-10 bg-center bg-no-repeat bg-contain pointer-events-none"
          style={{
            backgroundImage: "url('/images/bailarina-silueta.png')",
            backgroundPosition: "center",
            backgroundSize: "70%",
          }}
        ></div>

        {/* Contenido de cada página */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
