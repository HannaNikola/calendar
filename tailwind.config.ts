import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
 theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        "sky-light": "#e0f2fe", 
      },
    },
  },
   plugins: [
    require("tailwind-scrollbar-hide"),
  ],
};

export default config;
