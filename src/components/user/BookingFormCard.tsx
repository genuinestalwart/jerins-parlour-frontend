"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { formFIelds } from "@/utilities/BookingFormCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
	form: any;
	loading: boolean;
	setService: Function;
}

interface Item {
	_id: string;
	description: string;
	price: number;
	title: string;
}

const BookingFormCard: React.FC<Props> = ({ form, loading, setService }) => {
	const axiosSecure = useAxiosSecure();
	const value = form.watch("service");

	const { data = [], isLoading } = useQuery({
		queryKey: ["services"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/services");
			return data;
		},
	});

	useEffect(() => {
		if (value) {
			const service = data.find((item: Item) => item._id === value);
			setService(service);
		}
	}, [data, value, setService]);

	return (
		<Card className='border-none pt-8 rounded-xl shadow-none'>
			<CardContent className='space-y-4'>
				{formFIelds(data).map((item, i) => (
					<FormField
						control={form.control}
						key={i}
						name={item.name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{item.label}</FormLabel>

								<FormControl>
									<>
										{item.element(
											field,
											loading || isLoading
										)}
									</>
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

export default BookingFormCard;
