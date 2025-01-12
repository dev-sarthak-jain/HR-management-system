module.exports = {
  darkMode: "media", // Enable DarkMode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenCustom: "#000000", // Define a custom color value
        cardBackground: "#FDDFFD",
        purpleCustom: "#868CDB",
        chatTipBackground: "#F4F4F4",
        blackCustom: "#3E3E3E",
        // backgroundColor: "#E7EDFB",
        backgroundColor: "linear-gradient(159deg, #FFF 0%, #E7EDFB 32.07%)",
        updatedPurple:"#868BC7",
        greenOnDarkMode:"#3C6E71",
        nightModeDark: "#000000", //353535
        customBlue:"#284B63",
        mediaBoardColor: "#878BC7",

      },
      borderRadius: {
        card: "30px", // Define a custom border radius size
      },
      height: {
        "300px": "300px",
      },
      fontFamily: {
        inter: "Inter",
        nunito: "Nunito",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  // plugins: [require("daisyui")],
};
