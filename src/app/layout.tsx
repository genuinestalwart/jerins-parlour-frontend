import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@smastrom/react-rating/style.css";
import { cn } from "@/lib/utils";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

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
				<ReduxProvider>
					<div className='container min-h-screen'>{children}</div>
					<Toaster />
				</ReduxProvider>
			</body>
		</html>
	);
};

export default RootLayout;
