import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Field {
	element: (field: any, loading: boolean) => React.ReactNode;
	label: string;
	name: "email" | "name" | "service";
}

interface Item {
	_id: string;
	description: string;
	price: number;
	title: string;
}

export const formFIelds = (data: Array<Item>) => {
	const fields: Field[] = [
		{
			element: (field) => (
				<FormControl>
					<Input autoComplete='name' disabled {...field} />
				</FormControl>
			),
			label: "Your Name",
			name: "name",
		},
		{
			element: (field) => (
				<FormControl>
					<Input
						autoComplete='email'
						disabled
						{...field}
						type='email'
					/>
				</FormControl>
			),
			label: "Your Email",
			name: "email",
		},
		{
			element: (field, loading) => (
				<Select
					defaultValue={field.value}
					disabled={loading}
					onValueChange={field.onChange}>
					<FormControl>
						<SelectTrigger>
							<SelectValue placeholder='Select a service' />
						</SelectTrigger>
					</FormControl>

					<SelectContent>
						{data.map((item, i) => (
							<SelectItem key={i} value={item._id}>
								{item.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			),
			label: "Service Type",
			name: "service",
		},
	];

	return fields;
};
