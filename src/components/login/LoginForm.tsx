import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { formFields } from "@/utilities/LoginForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/shared/Spinner";

const LoginForm = ({
	activeTab,
	formSchema,
	loading,
	onSubmit,
	setActiveTab,
}: {
	activeTab: string;
	formSchema: any;
	loading: boolean;
	onSubmit: SubmitHandler<any>;
	setActiveTab: Function;
}) => {
	const login = activeTab === "login";

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: login
			? { email: "", password: "" }
			: { email: "", password: "", username: "" },
		resolver: zodResolver(formSchema),
	});

	const handleTab = () => {
		!loading && setActiveTab(login ? "register" : "login");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>
							{login ? "Login To Your" : "Create An"} Account
						</CardTitle>
					</CardHeader>

					<CardContent className='space-y-4'>
						{formFields(activeTab).map((item, i) => (
							<FormField
								control={form.control}
								key={i}
								name={item.name}
								render={({ field }) => (
									<>{item.element(field, loading)}</>
								)}
							/>
						))}
					</CardContent>

					<CardFooter className='block space-y-4'>
						<Button
							className='flex items-center space-x-2 w-full'
							disabled={loading}
							type='submit'>
							{loading && (
								<Spinner className='fill-white h-6 w-6' />
							)}
							<span>{login ? "Login" : "Register"}</span>
						</Button>

						<p className='font-medium text-center text-sm'>
							{login ? "Don't" : "Already"} have an account?{" "}
							<span
								className='cursor-pointer text-primary hover:underline underline-offset-1'
								onClick={() => handleTab()}>
								{login ? "Create an" : "Login to your"} account
							</span>
						</p>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default LoginForm;
