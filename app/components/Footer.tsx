import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#D6CFC7] pt-8 pb-8">

      {/* Línea dorada superior */}
      <div className="w-full h-px bg-[#C9A227] mb-8"></div>

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Redes sociales */}
        <div className="flex justify-center gap-10 mb-8">

          <a
            href="https://instagram.com"
            target="_blank"
            className="text-[#111111] hover:text-[#A4161A] transition text-3xl"
          >
            <FaInstagram />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            className="text-[#111111] hover:text-[#A4161A] transition text-3xl"
          >
            <FaYoutube />
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            className="text-[#111111] hover:text-[#A4161A] transition text-3xl"
          >
            <FaTiktok />
          </a>

        </div>

        {/* Derechos reservados */}
        <p className="text-sm text-[#4A4A4A] font-montserrat">
          © {new Date().getFullYear()} Claudia — Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
}