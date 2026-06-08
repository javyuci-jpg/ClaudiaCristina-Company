interface HeroGalleryProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
}

export default function HeroGallery({
  title = "Claudia",
  subtitle = "Arte Floral · Expresión · Sensibilidad",
  backgroundImage = "/claudia-portrait.jpg",
  height = "55vh",
}: HeroGalleryProps) {
  return (
    <section
      className="w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        height,
      }}
    >
      {/* Overlay suave y elegante */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-[Playfair_Display] font-bold tracking-wide mb-3">
          {title}
        </h1>

        <p className="text-lg md:text-xl opacity-90 font-light tracking-wide">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
