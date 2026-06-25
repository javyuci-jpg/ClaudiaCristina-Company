interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  videoSrc?: string;        // ← NUEVO: ruta del video
  posterImage?: string;     // ← NUEVO: imagen fallback
  height?: string;
}

export default function Hero({
  title = "Arte en Movimiento",
  subtitle = "Danza · Performance · Expresión contemporánea",
  buttonText = "Ver portafolio",

  // 👉 Aquí defines la ruta del video
  // LOCAL: /videos/hero.mp4
  // EXTERNO: https://res.cloudinary.com/.../video.mp4
  videoSrc = "/videos/hero.mp4",

  // 👉 Imagen fallback mientras carga el video
  posterImage = "/images/hero-fallback.jpg",

  height = "90vh",
}: HeroProps) {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height }}
    >
      {/* 🎥 VIDEO DE FONDO */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={posterImage}
      >
        {/* 
          👉 AQUÍ VA LA RUTA DEL VIDEO
          - LOCAL: /videos/hero.mp4
          - EXTERNO: https://res.cloudinary.com/.../video.mp4
        */}
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 🔳 CAPA OSCURA PARA MEJORAR CONTRASTE */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✨ CONTENIDO DEL HERO */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-6xl font-bold mb-4 tracking-wide">
          {title}
        </h1>

        <p className="text-xl mb-8 opacity-90">
          {subtitle}
        </p>

        <button className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
