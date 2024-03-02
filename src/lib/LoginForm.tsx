import { Input } from "@/components/ui/input";

interface Item {
	element: (field: any) => React.ReactNode;
	name: "email" | "password" | "username";
}

export const formFields = (value: string) => {
	const fields: Item[] = [
		{
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
			element: (field: any) => (
				<Input
					autoComplete='on'
					{...field}
					placeholder='Password'
					type='password'
				/>
			),
			name: "password",
		},
	];

	if (value === "register") {
		fields.unshift({
			element: (field: any) => (
				<Input autoComplete='on' {...field} placeholder='Full Name' />
			),
			name: "username",
		});
	}

	return fields;
};
