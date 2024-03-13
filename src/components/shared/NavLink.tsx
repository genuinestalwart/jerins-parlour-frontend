"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";

const NavLink = ({
	children,
	className,
	href,
	onClick,
}: {
	children: React.ReactNode;
	className: Function;
	href: string;
	onClick: MouseEventHandler<HTMLAnchorElement>;
}) => {
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
