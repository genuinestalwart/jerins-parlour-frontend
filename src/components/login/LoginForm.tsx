import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { formFields } from "@/lib/LoginForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = ({
	activeTab,
	formSchema,
	onSubmit,
	setActiveTab,
}: {
	activeTab: string;
	formSchema: any;
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
									<FormItem>
										<FormControl>
											{item.element(field)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</CardContent>

					<CardFooter className='block space-y-4'>
						<Button className='block w-full' type='submit'>
							{login ? "Login" : "Register"}
						</Button>

						<p className='font-medium text-center text-sm'>
							{login ? "Don't" : "Already"} have an account?{" "}
							<span
								className='cursor-pointer text-primary hover:underline underline-offset-1'
								onClick={() =>
									setActiveTab(login ? "register" : "login")
								}>
								{login ? "Login to your" : "Create an"} account
							</span>
						</p>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default LoginForm;
