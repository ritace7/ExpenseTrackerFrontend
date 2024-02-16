import type { Metadata } from "next";
import "./globals.css";
import { DataContextProvider } from "@/components/Context/store";

export const metadata: Metadata = {
	title: "Trex | Track Your Expense",
	description: "Save money by tracking your expenses on the daily.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="w-full h-screen bg-light font-poppins dark:bg-dark text-black dark:text-white">
				<DataContextProvider>{children}</DataContextProvider>
			</body>
		</html>
	);
}
