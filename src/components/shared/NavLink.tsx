"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";

interface Props {
	children: React.ReactNode;
	className: Function;
	href: string;
	onClick: MouseEventHandler<HTMLAnchorElement>;
}

const NavLink: React.FC<Props> = ({ children, className, href, onClick }) => {
	return (
		<Link
			className={className(href === usePathname())}
			href={href}
			onClick={onClick}
			scroll={false}>
			{children}
		</Link>
	);
};

export default NavLink;
