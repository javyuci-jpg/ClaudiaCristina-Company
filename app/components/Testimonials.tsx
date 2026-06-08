import SectionTitle from "./SectionTitle";
export default function Testimonials() {
  return (
    <section className="w-full py-8 bg-[#E8E1D9]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
           <SectionTitle>Testimonios</SectionTitle> 
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Testimonio 1 */}
          <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9]">
            <p className="text-lg text-[#333] leading-relaxed mb-6">
              “Claudia transformó completamente la atmósfera de nuestro evento. Su visión artística es única.”
            </p>
            <h4 className="font-semibold text-[#111] text-xl">María López</h4>
            <p className="text-sm text-[#666]">Evento Corporativo</p>
          </div>

          {/* Testimonio 2 */}
          <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9]">
            <p className="text-lg text-[#333] leading-relaxed mb-6">
              “Profesional, puntual y con un gusto impecable. Superó todas mis expectativas.”
            </p>
            <h4 className="font-semibold text-[#111] text-xl">Carlos Pérez</h4>
            <p className="text-sm text-[#666]">Boda</p>
          </div>

          {/* Testimonio 3 */}
          <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9]">
            <p className="text-lg text-[#333] leading-relaxed mb-6">
              “Cada detalle estuvo perfectamente cuidado. La recomendaría sin dudarlo.”
            </p>
            <h4 className="font-semibold text-[#111] text-xl">Ana Rodríguez</h4>
            <p className="text-sm text-[#666]">Sesión Fotográfica</p>
          </div>

        </div>
      </div>
    </section>
  );
}