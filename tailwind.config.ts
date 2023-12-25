import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        mobile: "490px",
        tablet: "1040px",
        desktop: "1620px",
      },
    },
  },
  plugins: [],
};
export default config;
