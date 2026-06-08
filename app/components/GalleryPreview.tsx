import Image from "next/image";
import SectionTitle from "./SectionTitle";


export default function GalleryPreview() {

    return (
    <section className="w-full py-8 bg-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
         <SectionTitle>Galería Destacada</SectionTitle> 
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Imagen 1 */}
          <div className="group overflow-hidden rounded-xl shadow-sm border border-[#E8E1D9]">
            <Image
              src="/galeria1.jpg"
              alt="Galería 1"
              width={600}
              height={400}
              className="object-cover h-72 w-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Imagen 2 */}
          <div className="group overflow-hidden rounded-xl shadow-sm border border-[#E8E1D9]">
            <Image
              src="/galeria2.jpg"
              alt="Galería 2"
              width={600}
              height={400}
              className="object-cover h-72 w-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Imagen 3 */}
          <div className="group overflow-hidden rounded-xl shadow-sm border border-[#E8E1D9]">
            <Image
              src="/galeria3.jpg"
              alt="Galería 3"
              width={600}
              height={400}
              className="object-cover h-72 w-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>

        {/* Botón */}
        <div className="text-center mt-12">
          <a
            href="/galeria"
            className="inline-block px-10 py-4 bg-[#A4161A] text-white font-montserrat text-lg rounded-lg hover:bg-[#7f1013] transition"
          >
            Ver Galería Completa
          </a>
        </div>

      </div>
    </section>
  );
}