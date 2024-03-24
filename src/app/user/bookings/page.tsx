"use client";
import BookingCard from "@/components/user/BookingCard";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import gifLoading from "@/assets/shared/loading.gif";

interface Item {
	service: { _id: string; description: string; price: number; title: string };
	status: string;
	timestamp: number;
	transactionID: string;
}

const BookingsPage = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const { data = [], isLoading } = useQuery({
		queryKey: ["bookings", user?.uid],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/bookings/${user?.uid}`);
			return data;
		},
	});

	return isLoading ? (
		<section className='flex h-[calc(100%_-_4rem)] items-center'>
			<Image
				alt='loading'
				className='mx-auto sm:w-1/2 md:w-1/3'
				priority
				src={gifLoading}
			/>
		</section>
	) : (
		<section className='gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 p-8'>
			{data.toReversed().map((item: Item, i: number) => (
				<BookingCard item={item} key={i} />
			))}
		</section>
	);
};

export default BookingsPage;
