/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
    safelist: ["bg-white", "bg-yellow-500", "bg-brown-500", "bg-black", "bg-red-500"],
};
