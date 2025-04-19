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
    },
  },
};

export default config;
