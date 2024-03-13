import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Item {
	element: (field: any, loading: boolean) => React.ReactNode;
	name: "email" | "password" | "username";
}

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<FormItem>
			<FormControl>{children}</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export const formFields = (value: string) => {
	const fields: Item[] = [
		{
			element: (field, loading) => (
				<InputWrapper>
					<Input
						autoComplete='on'
						disabled={loading}
						{...field}
						placeholder='Email Address'
						type='email'
					/>
				</InputWrapper>
			),
			name: "email",
		},
		{
			element: (field, loading) => (
				<InputWrapper>
					<Input
						autoComplete='on'
						disabled={loading}
						{...field}
						placeholder='Password'
						type='password'
					/>
				</InputWrapper>
			),
			name: "password",
		},
	];

	if (value === "register") {
		fields.unshift({
			element: (field, loading) => (
				<InputWrapper>
					<Input
						autoComplete='on'
						disabled={loading}
						{...field}
						placeholder='Full Name'
					/>
				</InputWrapper>
			),
			name: "username",
		});
	}

	return fields;
};
