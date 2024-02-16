import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		backgroundImage: {
			"gradient-radial":
				"radial-gradient(circle, rgba(132,88,179,1) 0%, rgba(229,234,245,1) 60%)",
		},
		extend: {
			fontFamily: {
				pixelify: ["Pixelify Sans", "san-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				dark: "#494D5F",
				light: "#E5EAF5",
				primary: "#8458B3",
				primaryDark: "#A0D2EB",
			},
		},
		screens: {
			"2xl": { max: "1535px" },
			// => @media (max-width: 1535px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }

			xs: { max: "479px" },
			// => @media (max-width: 479px) { ... }
		},
	},
	plugins: [],
};
export default config;
