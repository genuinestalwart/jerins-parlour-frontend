import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
	display: "swap",
	style: ["italic", "normal"],
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	description: "Beauty salon for every woman",
	title: "Jerin's Parlour",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(
					"antialiased bg-white font-poppins",
					poppins.variable
				)}>
				<div className='container min-h-screen'>{children}</div>
			</body>
		</html>
	);
};

export default RootLayout;
