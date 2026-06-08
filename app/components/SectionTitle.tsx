export default function SectionTitle({ children }: { children: string }) {
  return (
    <div className="w-full flex items-center justify-center mb-20">

      {/* Línea izquierda */}
      <div className="h-px w-48 md:w-100 bg-[#C9A227] mr-6"></div>

      {/* Título */}
      <h2 className="text-3xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] whitespace-nowrap mx-4">
        {children}
      </h2>

      {/* Línea derecha */}
      <div className="h-px w-48 md:w-100 bg-[#C9A227] ml-6"></div>

    </div>
  );
}