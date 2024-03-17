"use client";
import Header from "@/components/shared/Header";
import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { z } from "zod";
import LoginForm from "@/components/login/LoginForm";
import LoginWith from "@/components/login/LoginWith";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAdmin from "@/hooks/useAdmin";
import useAxiosSecure from "@/hooks/useAxiosSecure";
const tabs = ["login", "register"];

const LoginPage = () => {
	const [activeTab, setActiveTab] = useState("login");
	const router = useRouter();
	const {
		loading,
		loginUser,
		registerUser,
		sendEmailVerification,
		setLoading,
		updateProfile,
		user,
	} = useAuth();
	const axiosSecure = useAxiosSecure();
	const [isAdmin, isLoading] = useAdmin();
	const login = activeTab === "login";

	const formSchema = z.object(
		login
			? {
					email: z.coerce.string().email(),
					password: z.coerce.string().min(8).max(32),
			  }
			: {
					email: z.coerce.string().email(),
					password: z.coerce.string().min(8).max(32),
					name: z.coerce.string().min(3).max(32),
			  }
	);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (login) {
				await loginUser(values.email, values.password);
			} else {
				const { name, password } = values;
				const res = await registerUser(values.email, password);
				await updateProfile(res.user, { displayName: name });
				// await sendEmailVerification(res.user);
				const { email, uid } = res.user;
				await axiosSecure.post("/users", { email, name, uid });
			}
		} catch (error: any) {
			toast(error.code.split("/")[1].replaceAll("-", " "));
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user && !isLoading) {
			router.replace(isAdmin ? "/admin" : "/user", { scroll: false });
		}
	}, [isAdmin, isLoading, router, user]);

	return (
		<>
			<Header />

			<main className='pt-24 pb-12'>
				<Tabs
					className='mx-auto w-4/5 md:w-2/5'
					defaultValue='login'
					value={activeTab}>
					{tabs.map((item, i) => (
						<TabsContent value={item} key={i}>
							<LoginForm
								activeTab={activeTab}
								formSchema={formSchema}
								loading={loading || isLoading}
								onSubmit={onSubmit}
								setActiveTab={setActiveTab}
							/>
						</TabsContent>
					))}
				</Tabs>

				<LoginWith loading={loading || isLoading} />
			</main>
		</>
	);
};

export default LoginPage;
