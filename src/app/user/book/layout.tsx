import type { Metadata } from "next";

export const metadata: Metadata = {
	description: "Beauty salon for every woman",
	title: "Jerin's Parlour | Book",
};

const BookLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default BookLayout;
