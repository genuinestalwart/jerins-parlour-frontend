"use client";
import PageLoading from "@/components/shared/PageLoading";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import NotFoundPage from "@/app/not-found";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Component, Plus, Scroll, ShieldPlus } from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";

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
	const pathname = usePathname();
	const { loading, user } = useAuth();
	const [isAdmin, isLoading] = useAdmin();
	const text = navLinks.find((item) => item.path === pathname)?.text || "";

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login", { scroll: false });
		}
	}, [loading, router, user]);

	return loading || isLoading || !user ? (
		<PageLoading />
	) : user && isAdmin ? (
		<main className='md:flex md:h-screen 2xl:max-h-[810px]'>
			<Sidebar navLinks={navLinks} />

			<section className='bg-dashboard md:h-full md:overflow-y-auto md:w-[70%] lg:w-3/4'>
				<div className='bg-white flex h-16 items-center justify-between px-6 md:px-12'>
					<h1 className='font-semibold text-xl'>{text}</h1>
					<p className='font-medium line-clamp-1 max-w-48'>
						{user.displayName}
					</p>
				</div>

				{children}
			</section>
		</main>
	) : (
		<NotFoundPage />
	);
};

export default AdminLayout;
