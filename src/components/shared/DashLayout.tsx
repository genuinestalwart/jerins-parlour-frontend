"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import NavLink from "@/components/shared/NavLink";
import { useState } from "react";

interface Props {
	children: React.ReactNode;
	navLinks: Array<{ icon: React.ReactNode; path: string; text: string }>;
	username: string | null;
}

const DashLayout: React.FC<Props> = ({ children, navLinks, username }) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const text = navLinks.find((item) => item.path === pathname)?.text!;

	const navItems = navLinks.map((item, i) => (
		<NavLink
			className={(isActive: boolean) =>
				`block font-medium mx-auto px-4 py-2 rounded-md space-x-2 ${
					isActive
						? "text-primary"
						: "hover:bg-primary hover:text-white"
				}`
			}
			href={item.path}
			key={i}
			onClick={() => setOpen(false)}>
			{item.icon}
			<span className='inline-block'>{item.text}</span>
		</NavLink>
	));

	return (
		<div className='md:flex md:h-screen'>
			<Sidebar navItems={navItems} open={open} setOpen={setOpen} />

			<main className='bg-dashboard md:h-full md:overflow-y-auto md:w-[70%] lg:w-3/4'>
				<div className='bg-white flex h-16 items-center justify-between px-6 md:px-12'>
					<h1 className='font-semibold text-xl'>{text}</h1>

					<p className='font-medium line-clamp-1 max-w-48'>
						{username}
					</p>
				</div>

				{children}
			</main>
		</div>
	);
};

export default DashLayout;
