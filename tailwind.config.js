/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./src/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lexend", "sans-serif"],
    },
    extend: {
      colors: {
        "brand-1": "##4529E6",
        "brand-2": "#5126EA",
        "brand-3": "#B0A6F0",
        "brand-4": "#EDEAFD",
        "grey-0": "##0B0D0D",
        "grey-1": "#212529",
        "grey-2": "#495057",
        "grey-3": "#868E96",
        "grey-4": "#ADB5BD",
        "grey-5": "#CED4DA",
        "grey-6": "#DEE2E6",
        "grey-7": "#E9ECEF",
        "grey-8": "#F1F3F5",
        "grey-9": "#F8F9FA",
        "grey-10": "#FDFDFD",
        "white-fixed": "#FFFFFF",
        "black-fixed": "#000000",
        "alert-1": "#CD2B31",
        "alert-2": "#FDD8D8",
        "alert-3": "#FFE5E5",
        "random-1": "#E34D8C",
        "random-2": "#C04277",
        "random-3": "#7D2A4D",
        "random-4": "#7000FF",
        "random-5": "#6200E3",
        "random-6": "#36007D",
        "random-7": "#349974",
        "random-8": "#2A7D5F",
        "random-9": "#153D2E",
        "random-10": "#6100FF",
        "random-11": "#5700E3",
        "random-12": "#30007D",
      },
      fontSize: {
        "heading-1": ["2.75rem", "3.5rem"],
        "heading-2": ["2.25rem"],
        "heading-3": ["2rem"],
        "heading-4": ["1.75rem"],
        "heading-5": ["1.5rem"],
        "heading-6": ["1.25rem"],
        "heading-7": ["1rem"],
        "body-1": ["1rem", "1.75rem"],
        "body-2": ["0.875rem", "1.5rem"],
      },
      borderRadius: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        full: "100%",
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
      },
    },
  },
  plugins: [],
};
