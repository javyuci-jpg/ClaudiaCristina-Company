/** @type {import('next').NextConfig} */
const nextConfig = {
  // Internacionalización
  i18n: {
    locales: ["en", "fr", "es"], // idiomas soportados
    defaultLocale: "en",         // idioma principal
  },

  // Configuración de imágenes remotas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // pruebas
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",       // imágenes reales de Claudia
      },
    ],
  },

  // Buenas prácticas recomendadas
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
