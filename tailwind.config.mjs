const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: ["class", "[data-theme='dark']"],
    theme: {
        extend: {
            fontFamily: {
                heading: ["Krona One", ...defaultTheme.fontFamily.sans],
                sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                yama: {
                    "nav-items-color": `rgb(var(--yama-nav-items-color) / <alpha-value>)`,
                    "bg-color": `rgb(var(--yama-bg-color) / <alpha-value>)`,
                    "primary": `rgb(var(--yama-primary) / <alpha-value>)`,
                    "accent": `rgb(var(--yama-accent) / <alpha-value>)`
                },
            },
            transitionTimingFunction: {
                'elastic': 'cubic-bezier(.68, -0.55, .265, 1.55)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}

