"use client";
import PageLoading from "@/components/shared/PageLoading";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import NotFoundPage from "@/app/not-found";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Bookmark, MessageSquareMore, ShoppingCart } from "lucide-react";
import DashLayout from "@/components/shared/DashLayout";

const navLinks = [
	{ icon: <ShoppingCart />, path: "/user/book", text: "Book" },
	{ icon: <Bookmark />, path: "/user/bookings", text: "Booking List" },
	{ icon: <MessageSquareMore />, path: "/user/review", text: "Review" },
];

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { loading, user } = useAuth();
	const [isAdmin, isLoading] = useAdmin();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login", { scroll: false });
		}
	}, [loading, router, user]);

	return loading || isLoading || !user ? (
		<PageLoading />
	) : user && !isAdmin ? (
		<DashLayout navLinks={navLinks} username={user.displayName}>
			{children}
		</DashLayout>
	) : (
		<NotFoundPage />
	);
};

export default UserLayout;
