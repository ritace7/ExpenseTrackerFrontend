"use client";

import { useState, useEffect } from "react";

//toggle between light and dark mode
const useThemeSwitcher = (): [
	string,
	React.Dispatch<React.SetStateAction<string>>
] => {
	const [theme, setTheme] = useState("");
	const preferDarkQuery = "(prefer-color-scheme: dark)";

	useEffect(() => {
		const mediaQuery = window.matchMedia(preferDarkQuery);
		const userPreference = window.localStorage.getItem("theme");

		const handleChange = () => {
			if (userPreference) {
				let preferredTheme = userPreference === "dark" ? "dark" : "light";
				setTheme(preferredTheme);

				if (preferredTheme === "dark") {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			} else {
				let preferredTheme = mediaQuery.matches ? "dark" : "light";
				setTheme(preferredTheme);

				if (preferredTheme === "dark") {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			}
		};

		handleChange();

		mediaQuery.addEventListener("change", handleChange);

		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		if (theme === "dark") {
			window.localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
		}

		if (theme == "light") {
			window.localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return [theme, setTheme];
};

export default useThemeSwitcher;
