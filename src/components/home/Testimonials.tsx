"use client";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import ReviewSlides from "@/components/shared/ReviewSlides";
import { Skeleton } from "@/components/ui/skeleton";

const Testimonials = () => {
	const [reviews, setReviews] = useState([]);
	const axiosPublic = useAxiosPublic();

	useEffect(() => {
		axiosPublic.get("/reviews.json").then(({ data }) => setReviews(data));
	}, [axiosPublic]);

	return (
		<section className='bg-white py-16 space-y-12'>
			<h2 className='font-bold text-center text-4xl'>Testimonials</h2>

			{reviews.length ? (
				<ReviewSlides reviews={reviews} />
			) : (
				<div className='gap-16 grid grid-cols-1 md:grid-cols-3 mx-auto w-4/5 md:w-[90%]'>
					{[0, 1, 2].map((v, i) => (
						<div className='space-y-4' key={i}>
							<div className='flex items-center space-x-4'>
								<Skeleton className='h-12 w-12 rounded-full' />

								<div className='flex-grow *:h-4 space-y-2'>
									<Skeleton className='w-full' />
									<Skeleton className='w-4/5' />
								</div>
							</div>

							<div className='*:h-4 space-y-2'>
								<Skeleton className='w-full' />
								<Skeleton className='w-full' />
								<Skeleton className='w-3/4' />
							</div>

							<Skeleton className='h-6 w-1/2' />
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default Testimonials;
