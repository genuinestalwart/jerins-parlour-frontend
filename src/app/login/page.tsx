"use client";
import Header from "@/components/shared/Header";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { z } from "zod";
import LoginForm from "@/components/login/LoginForm";
import LoginWith from "@/components/login/LoginWith";
const tabs = ["login", "register"];

const LoginPage = () => {
	const [activeTab, setActiveTab] = useState("login");
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

	const onSubmit = (values: z.infer<typeof formSchema>) => {};

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
