import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Item {
	element: (field: any) => React.ReactNode;
	name: "email" | "message" | "phone" | "username";
	className: string;
}

export const formFields: Item[] = [
	{
		className: "md:col-span-2",
		element: (field: any) => (
			<Input autoComplete='on' {...field} placeholder='Full Name' />
		),
		name: "username",
	},
	{
		className: "",
		element: (field: any) => (
			<Input
				autoComplete='on'
				{...field}
				placeholder='Email Address'
				type='email'
			/>
		),
		name: "email",
	},
	{
		className: "",
		element: (field: any) => (
			<Input
				autoComplete='on'
				{...field}
				placeholder='Phone Number'
				type='tel'
			/>
		),
		name: "phone",
	},
	{
		className: "md:col-span-2",
		element: (field: any) => (
			<Textarea {...field} rows={5} placeholder='Your Message' />
		),
		name: "message",
	},
];
