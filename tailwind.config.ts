import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
        screens:{
            laptop: '1280px',
            desktop: '1440px'
        }
    },
  },
};

export default config;
