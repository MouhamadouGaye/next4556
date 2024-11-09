// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;


// tailwind.config.js
import type { Config } from "tailwindcss";
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define a custom color palette   
        primary: "#2b2d42",    // Dark blue-gray for primary text
        accent: "#d90429",     // Bold, bright red for accents
        secondary: "#8d99ae",  // Cool gray for secondary text
        highlight: "#edf2f4",  // Light gray-blue for cards and containers
        link: "#ef233c",       // Reddish link color to stand out
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
   
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Choose a clean, modern sans-serif
      },
    },
  },
  plugins: [],
};
