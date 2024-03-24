"use client";
import OrderTableBody from "@/components/admin/OrderTableBody";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRedux from "@/hooks/useRedux";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const thead = ["Name", "Email Address", "Service", "Booked At", "Status"];

interface Item {
	_id: string;
	email: string;
	name: string;
	service: { _id: string; description: string; price: number; title: string };
	status: string;
	timestamp: number;
	transactionID: string;
}

const OrdersPage = () => {
	const [loading, setLoading] = useState(false);
	const axiosSecure = useAxiosSecure();
	const { setConfirmOpen, setErrorData, setErrorOpen } = useRedux();

	const { data = [], refetch } = useQuery({
		queryKey: ["bookings"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/bookings");
			return data;
		},
	});

	const handleStatus = async (status: string, _id: string) => {
		setLoading(true);
		setConfirmOpen(false);

		try {
			await axiosSecure.patch(`/bookings/${_id}`, { status });
			await refetch();
		} catch (error) {
			setErrorData("Unable to update the booking status");
			setErrorOpen(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className='p-8'>
			<Table className='bg-white'>
				<TableHeader>
					<TableRow>
						{thead.map((item: string, i: number) => (
							<TableHead key={i}>{item}</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.toReversed().map((item: Item, i: number) => (
						<OrderTableBody
							handleStatus={handleStatus}
							item={item}
							key={i}
							loading={loading}
						/>
					))}
				</TableBody>
			</Table>
		</section>
	);
};

export default OrdersPage;
