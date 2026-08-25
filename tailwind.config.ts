import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Noto Sans CJK SC",
          "WenQuanYi Micro Hei",
          "Microsoft YaHei",
          "system-ui",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
