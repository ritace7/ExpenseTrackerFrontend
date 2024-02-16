import { Logo, UserForm } from "@/components";

export default function Home() {
	return (
		<main className="bg-gradient-radial w-full h-full flex flex-col items-center justify-center gap-4">
			<Logo />
			<UserForm />
		</main>
	);
}
