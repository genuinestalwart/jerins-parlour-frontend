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
					username: z.coerce.string().min(3).max(32),
			  }
	);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (login) {
				await loginUser(values.email, values.password);
			} else {
				const res = await registerUser(values.email, values.password);
				await updateProfile(res.user, { displayName: values.username });
				await sendEmailVerification(res.user);
			}
		} catch (error: any) {
			toast(error.code.split("/")[1].replaceAll("-", " "));
			setLoading(false);
		}
	};

	useEffect(() => {
		user && router.push("/dashboard");
	}, [router, user]);

	return (
		<>
			<Header />

			<main className='pt-24'>
				<Tabs
					className='mx-auto w-2/5'
					defaultValue='login'
					value={activeTab}>
					{tabs.map((item, i) => (
						<TabsContent value={item} key={i}>
							<LoginForm
								activeTab={activeTab}
								formSchema={formSchema}
								loading={loading}
								onSubmit={onSubmit}
								setActiveTab={setActiveTab}
							/>
						</TabsContent>
					))}
				</Tabs>

				<LoginWith />
			</main>
		</>
	);
};

export default LoginPage;
