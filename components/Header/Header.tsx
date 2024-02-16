import { Logo } from "..";
import HeaderThemeButton from "./HeaderThemeButton";

const Header = () => {
	return (
		<div className="w-full flex items-center py-2">
			<div className="flex w-full items-center justify-between">
				<Logo />
				<HeaderThemeButton />
			</div>
		</div>
	);
};

export default Header;
