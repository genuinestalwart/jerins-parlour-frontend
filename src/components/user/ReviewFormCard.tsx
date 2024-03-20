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
import { Rating, RoundedStar } from "@smastrom/react-rating";

interface Field {
	element: (field: any, loading: boolean) => React.ReactNode;
	label: string;
	name: "review" | "status";
}

const itemStyles = {
	itemShapes: RoundedStar,
	activeFillColor: "#f09e10",
	inactiveFillColor: "#8fa3bb",
};

const formFields: Field[] = [
	{
		element: (field, loading) => <Input disabled={loading} {...field} />,
		label: "Your Status",
		name: "status",
	},
	{
		element: (field, loading) => (
			<Textarea disabled={loading} {...field} rows={5} />
		),
		label: "Your Review",
		name: "review",
	},
];

const ReviewFormCard = ({
	form,
	loading,
	rating,
	setRating,
}: {
	form: any;
	loading: boolean;
	rating: number;
	setRating: Function;
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

				<Rating
					className='max-w-32'
					itemStyles={itemStyles}
					onChange={(v: number) => setRating(v)}
					readOnly={loading}
					value={rating}
				/>
			</CardContent>
		</Card>
	);
};

export default ReviewFormCard;
