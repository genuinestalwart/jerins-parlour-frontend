"use client";
import Image from "next/image";
import logo from "@/assets/shared/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavLink from "@/components/shared/NavLink";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerPortal,
} from "@/components/ui/drawer";

const navLinks = [
	{ text: "Home", path: "/" },
	{ text: "Our Portfolio", path: "/portfolio" },
	{ text: "Our Team", path: "/team" },
	{ text: "Contact Us", path: "/contact-us" },
];

const Header = () => {
	const [open, setOpen] = useState(false);

	const navItems = navLinks.map((item, i) => (
		<NavLink
			className={(isActive: boolean) =>
				`hover:bg-primary md:hover:bg-transparent block font-medium mx-auto py-2 md:py-0 rounded-lg md:rounded-none text-center md:hover:text-secondary md:hover:underline underline-offset-2 w-4/5 md:w-auto ${
					isActive ? "md:text-primary" : ""
				}`
			}
			href={item.path}
			key={i}
			onClick={() => setOpen(false)}>
			{item.text}
		</NavLink>
	));

	return (
		<header className='fixed flex h-24 inset-0 items-center justify-between mx-auto w-[90%] z-10'>
			<Button
				className='md:hidden px-2'
				onClick={() => setOpen(true)}
				variant='outline'>
				<Menu />
			</Button>

			<Image alt='logo' className='h-1/2 w-auto' priority src={logo} />

			<nav className='flex items-center space-x-8'>
				<div className='md:flex hidden items-center space-x-8'>
					{navItems}
				</div>

				<Button asChild className='md:px-6 lg:px-8'>
					<Link href='/login'>Login</Link>
				</Button>

				<Drawer onOpenChange={setOpen} open={open}>
					<DrawerPortal>
						<DrawerOverlay />

						<DrawerContent className='py-8'>
							{navItems}
						</DrawerContent>
					</DrawerPortal>
				</Drawer>
			</nav>
		</header>
	);
};

export default Header;
