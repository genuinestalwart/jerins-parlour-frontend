import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerPortal,
} from "@/components/ui/drawer";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/shared/Spinner";

const Navbar = ({
	navItems,
	open,
	setOpen,
}: {
	navItems: Array<React.ReactNode>;
	open: boolean;
	setOpen: (open: boolean) => void;
}) => {
	const { loading, logoutUser, user } = useAuth();

	return (
		<nav className='flex items-center space-x-8'>
			<div className='md:flex hidden items-center space-x-8'>
				{navItems}
			</div>

			{loading ? (
				<Spinner className='fill-primary h-8 w-8' />
			) : user ? (
				<Button onClick={() => logoutUser()}>Logout</Button>
			) : (
				<Button asChild>
					<Link href='/login' scroll={false}>
						Login
					</Link>
				</Button>
			)}

			<Drawer onOpenChange={setOpen} open={open}>
				<DrawerPortal>
					<DrawerOverlay />
					<DrawerContent className='py-8'>{navItems}</DrawerContent>
				</DrawerPortal>
			</Drawer>
		</nav>
	);
};

export default Navbar;
