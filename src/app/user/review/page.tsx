"use client";
import MyReview from "@/components/user/MyReview";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import gifLoading from "@/assets/shared/loading.gif";
import { useState } from "react";
import ReviewWrapper from "@/components/user/ReviewWrapper";
import useRedux from "@/hooks/useRedux";

const ReviewPage = () => {
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { setConfirmOpen, setErrorData, setErrorOpen } = useRedux();

	const {
		data = null,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["review", user?.uid],
		queryFn: async () => {
			const res = await axiosSecure.get(`/reviews/${user?.uid}`);
			return res.data;
		},
	});

	const handleConfirm = async (values: {
		rating: number;
		review: string;
		status: string;
	}) => {
		setLoading(true);
		setConfirmOpen(false);

		const review = {
			image: user?.photoURL,
			name: user?.displayName,
			rating: values.rating,
			review: values.review,
			status: values.status,
			uid: user?.uid,
		};

		try {
			if (data) {
				await axiosSecure.patch(`/reviews/${user?.uid}`, review);
			} else {
				await axiosSecure.post("/reviews", review);
			}

			await refetch();
			setEditMode(false);
			setLoading(false);
		} catch (error) {
			setErrorData(`Unable to ${data ? "update" : "post"} the review`);
			setErrorOpen(true);
			setLoading(false);
		}
	};

	return (
		<section className='h-[calc(100%_-_4rem)] p-8'>
			{isLoading ? (
				<div className='flex h-full items-center'>
					<Image
						alt='loading'
						className='mx-auto sm:w-1/2 md:w-1/3'
						priority
						src={gifLoading}
					/>
				</div>
			) : !data || editMode ? (
				<ReviewWrapper
					data={data}
					editMode={editMode}
					handleConfirm={handleConfirm}
					loading={loading}
					setEditMode={setEditMode}
				/>
			) : (
				<MyReview data={data} setEditMode={setEditMode} />
			)}
		</section>
	);
};

export default ReviewPage;
