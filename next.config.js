/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ← pruebas
      },
      {
        protocol: "https",
        hostname: "*.supabase.co", // ← imágenes reales de Claudia
      },
    ],
  },
};

module.exports = nextConfig;
