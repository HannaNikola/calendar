import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true 
  },
  i18n: {
     locales: ["en"],
     defaultLocale: "en",
    },
  /* config options here */
};

export default nextConfig;



