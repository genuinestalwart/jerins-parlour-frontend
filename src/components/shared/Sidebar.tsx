"use client";
import Image from "next/image";
import logo from "@/assets/shared/logo.png";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetOverlay,
	SheetPortal,
} from "@/components/ui/sheet";
import NavLink from "@/components/shared/NavLink";

interface Links {
	icon: React.ReactNode;
	path: string;
	text: string;
}

const Sidebar = ({ navLinks }: { navLinks: Array<Links> }) => {
	const [open, setOpen] = useState(false);

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
		<header className='flex md:flex-col h-16 md:h-full items-center justify-between md:justify-normal px-6 md:px-0 md:py-4 md:space-y-8 md:w-[30%] lg:w-1/4'>
			<Image
				alt='logo'
				className='h-3/4 md:h-auto w-auto md:w-1/2'
				priority
				src={logo}
			/>

			<Button
				className='md:hidden px-2'
				onClick={() => setOpen(true)}
				variant='outline'>
				<Menu />
			</Button>

			<div className='md:block hidden [&_svg]:hidden lg:[&_svg]:inline-block w-4/5'>
				{navItems}
			</div>

			<Sheet onOpenChange={setOpen} open={open}>
				<SheetPortal>
					<SheetOverlay />

					<SheetContent className='[&_svg]:inline-block' side='left'>
						{navItems}
					</SheetContent>
				</SheetPortal>
			</Sheet>
		</header>
	);
};

export default Sidebar;
