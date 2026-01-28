/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            maxWidth: {
                'container': '720px',
            },
            colors: {
                'primary': '#000000',
                'secondary': '#666666',
                'border': '#e5e5e5',
            },
            fontFamily: {
                'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
