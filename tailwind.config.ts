import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	plugins: [require("tailwindcss-animate")],
	theme: {
		container: { center: true, screens: { "2xl": "1440px" } },
		extend: {
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				dashboard: "#F4F7FC",
				home: "#FFF8F5",
				primary: "#F63E7B",
				secondary: "#111430",
			},
			fontFamily: {
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			screens: { "2xl": "1440px" },
		},
	},
} satisfies Config;

export default config;
