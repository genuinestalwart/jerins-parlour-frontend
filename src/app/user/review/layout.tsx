import type { Metadata } from "next";

export const metadata: Metadata = {
	description: "Beauty salon for every woman",
	title: "Jerin's Parlour | Review",
};

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default ReviewLayout;
