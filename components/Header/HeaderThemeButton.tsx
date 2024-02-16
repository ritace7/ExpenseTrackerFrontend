"use client";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const HeaderThemeButton = () => {
	const [mode, setMode] = useThemeSwitcher();
	return (
		<button
			className="w-10 h-10 flex items-center justify-center bg-black rounded-full hover:scale-105"
			onClick={() => setMode(mode === "light" ? "dark" : "light")}
		>
			{mode === "dark" ? (
				<FontAwesomeIcon
					icon={faMoon}
					className="w-6 h-6 text-light"
					title="Dark Mode"
					titleId="Dark Mode"
				/>
			) : (
				<FontAwesomeIcon
					icon={faSun}
					className="w-6 h-6 text-yellow-400"
					title="Light Mode"
					titleId="Light Mode"
				/>
			)}
		</button>
	);
};

export default HeaderThemeButton;
