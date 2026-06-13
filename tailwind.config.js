/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0f172a",
                secondary: "#0f172a",
                accent: "#38bdf8",
            },
        },
    },
    plugins: [],
}