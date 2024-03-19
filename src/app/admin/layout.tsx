"use client";
import PageLoading from "@/components/shared/PageLoading";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import NotFoundPage from "@/app/not-found";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Component, Plus, Scroll, ShieldPlus } from "lucide-react";
import DashLayout from "@/components/shared/DashLayout";

const navLinks = [
	{ icon: <Scroll />, path: "/admin/orders", text: "Order List" },
	{ icon: <Plus />, path: "/admin/add-service", text: "Add Service" },
	{ icon: <ShieldPlus />, path: "/admin/make-admin", text: "Make Admin" },
	{
		icon: <Component />,
		path: "/admin/manage-services",
		text: "Manage Services",
	},
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
	) : user && isAdmin ? (
		<DashLayout navLinks={navLinks} username={user.displayName}>
			{children}
		</DashLayout>
	) : (
		<NotFoundPage />
	);
};

export default AdminLayout;
