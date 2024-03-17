"use client";
import Image from "next/image";
import logo from "@/assets/shared/logo.png";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/shared/NavLink";
import { useState } from "react";
import { Menu } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

const navLinks = [
	{ path: "/", text: "Home" },
	{ path: "/portfolio", text: "Our Portfolio" },
	{ path: "/team", text: "Our Team" },
	{ path: "/contact-us", text: "Contact Us" },
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
			<Navbar navItems={navItems} open={open} setOpen={setOpen} />
		</header>
	);
};

export default Header;
