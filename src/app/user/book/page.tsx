"use client";
import moment from "moment";
import { CardElementComponent, Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElements, loadStripe } from "@stripe/stripe-js";
import BookingForm from "@/components/user/BookingForm";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRedux from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_publishableKey!);

interface Data {
	CardElement: CardElementComponent;
	clientSecret: string;
	elements: StripeElements | null;
	stripe: Stripe | null;
}

interface Service {
	_id: string;
	description: string;
	price: number;
	title: string;
}

const BookPage = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { setConfirmOpen, setErrorData, setErrorOpen } = useRedux();

	const handlePayment = async (data: Data, service: Service) => {
		setLoading(true);
		setConfirmOpen(false);
		const { CardElement, elements, stripe } = data;

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (!card) {
			return;
		}

		const { error: createError } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (createError) {
			setError(createError.message!);
			setLoading(false);
		}

		const {
			data: { clientSecret },
		} = await axiosSecure.post("/create-payment-intent", {
			price: service.price,
		});

		const { error: confirmError, paymentIntent } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card,
					billing_details: {
						email: user?.email || "anonymous",
						name: user?.displayName || "anonymous",
					},
				},
			});

		if (confirmError) {
			setError(confirmError.message!);
			setLoading(false);
		}

		if (paymentIntent?.status === "succeeded") {
			const booking = {
				email: user?.email,
				name: user?.displayName,
				service,
				status: "pending",
				timestamp: moment().unix(),
				transactionID: paymentIntent.id,
				uid: user?.uid,
			};

			try {
				await axiosSecure.post("/payments", booking);
				router.push("/user/bookings", { scroll: false });
			} catch (error) {
				setErrorData("Could not book the service");
				setErrorOpen(true);
				setLoading(false);
			}
		}
	};

	return (
		<section className='p-8'>
			<Elements stripe={stripePromise}>
				<BookingForm
					error={error}
					handlePayment={handlePayment}
					loading={loading}
				/>
			</Elements>
		</section>
	);
};

export default BookPage;
