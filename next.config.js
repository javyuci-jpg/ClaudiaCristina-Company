/** @type {import('next').NextConfig} */

import withNextIntl from "next-intl/plugin";

const nextConfig = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en"
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  reactStrictMode: true,
  swcMinify: true
};

export default withNextIntl("./next-intl.config.js")(nextConfig);
