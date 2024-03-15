"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { formFields } from "@/utilities/ContactUs";

const formSchema = z.object({
	email: z.coerce.string().email(),
	message: z.coerce.string().min(32).max(512),
	phone: z.coerce.string(),
	name: z.coerce.string().min(3).max(32),
});

const ContactUs = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { email: "", message: "", phone: "", name: "" },
		resolver: zodResolver(formSchema),
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {};

	return (
		<section className='py-16 space-y-8'>
			<h2 className='font-bold mx-auto text-center text-4xl md:w-2/5'>
				Let Us Handle Your Project, Professionally.
			</h2>

			<Form {...form}>
				<form
					className='space-y-4'
					onSubmit={form.handleSubmit(onSubmit)}>
					<div className='gap-4 grid grid-cols-1 md:grid-cols-2 mx-auto w-4/5 md:w-1/2'>
						{formFields.map((item, i) => (
							<FormField
								control={form.control}
								key={i}
								name={item.name}
								render={({ field }) => (
									<FormItem className={item.className}>
										<FormControl>
											{item.element(field)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>

					<Button className='block mx-auto' type='submit'>
						Submit
					</Button>
				</form>
			</Form>
		</section>
	);
};

export default ContactUs;
