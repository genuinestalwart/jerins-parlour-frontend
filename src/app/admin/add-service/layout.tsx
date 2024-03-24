import type { Metadata } from "next";

export const metadata: Metadata = {
	description: "Beauty salon for every woman",
	title: "Jerin's Parlour | Add Service",
};

const AddServiceLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default AddServiceLayout;
