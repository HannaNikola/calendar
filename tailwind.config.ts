import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    
    extend: {
      fontFamily:{
         sans: ['var(--font-sans)', 
          'ui-sans-serif', 
          'system-ui',
          '-apple-system',]
      },
        screens:{
            laptop: '1280px',
            desktop: '1440px'
        }
    },
  },
};

export default config;
