import SectionTitle from "./SectionTitle";
export default function Services() {
  return (
    <section className="w-full py-8 bg-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
          <SectionTitle>Nuestros Servicios</SectionTitle> 
          
        </h2>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Danza */}
          <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
            <div className="text-5xl mb-6">💃</div>
            <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
              Danza
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
              Presentaciones de danza contemporánea, piezas coreográficas y proyectos escénicos personalizados.
            </p>
          </div>

          {/* Performance */}
          <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
            <div className="text-5xl mb-6">🎭</div>
            <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
              Performance
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
              Intervenciones artísticas, performance experimental y colaboraciones creativas para eventos y producciones.
            </p>
          </div>

          {/* Eventos */}
         <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
            <div className="text-5xl mb-6">📅</div>
            <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
              Eventos
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
              Participación en festivales, galas, producciones audiovisuales y eventos culturales.
            </p>
          </div>
{/* Danza */}
          <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
            <div className="text-5xl mb-6">💃</div>
            <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
              Danza
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
              Presentaciones de danza contemporánea, piezas coreográficas y proyectos escénicos personalizados.
            </p>
          </div>

          {/* Performance */}
          <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
            <div className="text-5xl mb-6">🎭</div>
            <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
              Performance
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
              Intervenciones artísticas, performance experimental y colaboraciones creativas para eventos y producciones.
            </p>
          </div>

          {/* Eventos */}
         <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
            <div className="text-5xl mb-6">📅</div>
            <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
              Eventos
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
              Participación en festivales, galas, producciones audiovisuales y eventos culturales.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}