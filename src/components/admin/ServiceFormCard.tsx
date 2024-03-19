import { Card, CardContent } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Field {
	element: (field: any, loading: boolean) => React.ReactNode;
	label: string;
	name: "description" | "title";
}

const formFields: Field[] = [
	{
		element: (field, loading) => <Input disabled={loading} {...field} />,
		label: "Service Title",
		name: "title",
	},
	{
		element: (field, loading) => (
			<Textarea disabled={loading} {...field} rows={5} />
		),
		label: "Description",
		name: "description",
	},
];

const ServiceFormCard = ({
	form,
	loading,
}: {
	form: any;
	loading: boolean;
}) => {
	return (
		<Card className='border-none pt-8 rounded-xl shadow-none'>
			<CardContent className='space-y-4'>
				{formFields.map((item, i) => (
					<FormField
						control={form.control}
						key={i}
						name={item.name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{item.label}</FormLabel>

								<FormControl>
									<>{item.element(field, loading)}</>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default ServiceFormCard;
