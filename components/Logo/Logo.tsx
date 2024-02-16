import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	return (
		<div className="flex items-center justify-center">
			<Link
				href="/"
				className="border bg-black rounded-full border-solid border-transparent flex items-center justify-center"
			>
				<Image
					src="/images/logo.png"
					alt="brand logo"
					width={100}
					height={100}
					className="w-20 h-20 scale-125"
					priority
					quality={100}
				/>
			</Link>
		</div>
	);
};

export default Logo;
