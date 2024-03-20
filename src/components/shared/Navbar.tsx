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
import useAdmin from "@/hooks/useAdmin";

interface Props {
	navItems: Array<React.ReactNode>;
	open: boolean;
	setOpen: (open: boolean) => void;
}
const Navbar: React.FC<Props> = ({ navItems, open, setOpen }) => {
	const { loading, logoutUser, user } = useAuth();
	const [isAdmin, isLoading] = useAdmin();

	const dashLink =
		!loading && !isLoading && user ? (
			<Link
				className='hover:bg-primary md:hover:bg-transparent block font-medium mx-auto py-2 md:py-0 rounded-lg md:rounded-none text-center md:hover:text-secondary md:hover:underline underline-offset-2 w-4/5 md:w-auto'
				href={isAdmin ? "/admin" : "/user"}
				onClick={() => setOpen(false)}
				scroll={false}>
				Dashboard
			</Link>
		) : (
			<></>
		);

	return (
		<nav className='flex items-center space-x-8'>
			<div className='md:flex hidden items-center space-x-8'>
				{navItems}
				{dashLink}
			</div>

			{loading || isLoading ? (
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
					<DrawerContent className='py-8'>
						{navItems}
						{dashLink}
					</DrawerContent>
				</DrawerPortal>
			</Drawer>
		</nav>
	);
};

export default Navbar;
