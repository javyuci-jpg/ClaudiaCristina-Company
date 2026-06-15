interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  backgroundImage?: string;
  height?: string;
}

export default function Hero({
  title = "Arte en Movimiento",
  subtitle = "Danza · Performance · Expresión contemporánea",
  buttonText = "Ver portafolio",
  backgroundImage = "/hero.mp4",
  height = "90vh",
}: HeroProps) {
  return (
    <section
      className="w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        height,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

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
