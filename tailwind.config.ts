import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react"
import { addDynamicIconSelectors } from "@iconify/tailwind"
import daisyui from "daisyui"

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    daisyui: {
        themes: [
            {
                light: {
                    "base-100": "#ffffff",
                    "base-200": "#f4f8ff",
                    "base-300": "#DAE8FF",
                    info: "#71BBFF",
                    success: "#6FDAA6",
                    warning: "#FFCB45",
                    error: "#F03D3D",
                    "--rounded-btn": "12px",
                    "--fallback-b3": "#cfcfcf54",
                    ".link": {
                        textUnderlineOffset: "2px",
                    },
                    ".link:hover": {
                        opacity: "80%",
                    },
                },
            },
        ],
    },
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        extend: {
            boxShadow: {
                center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
                centermd: "0 0 12px 2px rgb(0 0 0 / 0.05)",
                centerlg: "0 0 22px 2px rgb(0 0 0 / 0.05)",
            },
            animation: {
                "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            colors: {
                main: "#F31260"
            },
        },
    },
    darkMode: "class",
    plugins: [nextui(), daisyui, addDynamicIconSelectors()],
};
export default config;


