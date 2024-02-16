import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full border-t-2 border-solid border-slate-950 text-lg py-4">
			<div className="flex items-baseline justify-end px-2">
				<span className="text-sm mr-1">&copy;</span>
				Created By
				<Link
					href="https://www.linkedin.com/in/hritesh7/"
					className="ml-1 font-pixelify text-xl hover:text-primary dark:hover:text-primaryDark"
					target="_blank"
				>
					RITACE
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
