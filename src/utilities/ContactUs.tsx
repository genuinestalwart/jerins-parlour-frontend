import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Field {
	element: (field: any) => React.ReactNode;
	name: "email" | "message" | "phone" | "name";
	className: string;
}

export const formFields: Field[] = [
	{
		className: "md:col-span-2",
		element: (field) => (
			<Input autoComplete='on' {...field} placeholder='Full Name' />
		),
		name: "name",
	},
	{
		className: "",
		element: (field) => (
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
		element: (field) => (
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
		element: (field) => (
			<Textarea {...field} placeholder='Your Message' rows={5} />
		),
		name: "message",
	},
];
