"use client";
import Image from "next/image";
import logo from "@/assets/shared/logo.png";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetOverlay,
	SheetPortal,
} from "@/components/ui/sheet";

interface Props {
	navItems: Array<React.ReactNode>;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ navItems, open, setOpen }) => {
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
