"use client";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BookingFormCard from "@/components/user/BookingFormCard";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useRedux from "@/hooks/useRedux";

interface Props {
	error: string;
	handlePayment: Function;
	loading: boolean;
}

const formSchema = z.object({
	email: z.coerce.string().trim().email(),
	name: z.coerce.string().trim().min(3).max(32),
	service: z.coerce.string().trim(),
});

const BookingForm: React.FC<Props> = ({ error, handlePayment, loading }) => {
	const dv = { _id: "", description: "", price: 0, title: "" };
	const [clientSecret, setClientSecret] = useState("");
	const [service, setService] = useState(dv);
	const { user } = useAuth();
	const stripe = useStripe();
	const elements = useElements();
	const { setConfirmData, setConfirmOpen } = useRedux();
	const data = { CardElement, elements, stripe };

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { email: user?.email!, name: user?.displayName! },
		resolver: zodResolver(formSchema),
	});

	const { isValid } = form.formState;
	const serviceValue = form.watch("service");

	const onSubmit = () => {
		setConfirmData({
			confirm: (
				<Button onClick={() => handlePayment(data, service)}>
					Confirm
				</Button>
			),
			description: `Are you sure you want to book the ${service.title} service?`,
			title: "Confirm Payment",
		});

		setConfirmOpen(true);
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 md:w-1/2'
				onSubmit={form.handleSubmit(onSubmit)}>
				<BookingFormCard
					form={form}
					loading={loading}
					setService={setService}
				/>

				<Card className='border-none pt-8 rounded-xl shadow-none'>
					<CardContent className='space-y-2'>
						<CardElement className='border-2 hover:border-primary hover:cursor-text p-4 rounded-md' />

						{error && (
							<p className='text-sm text-red-600'>{error}</p>
						)}
					</CardContent>
				</Card>

				<div className='flex items-center justify-between'>
					<p className='text-sm'>
						Your Service charged will be ${service.price}
					</p>

					<Button
						className='flex items-center space-x-2'
						disabled={
							loading ||
							!isValid ||
							!serviceValue ||
							!stripe ||
							!elements
						}
						type='submit'>
						{loading && (
							<Spinner className='fill-primary h-6 w-6' />
						)}

						<span>Book and Pay</span>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default BookingForm;
