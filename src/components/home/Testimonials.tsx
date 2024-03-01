"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating, RoundedStar } from "@smastrom/react-rating";

const itemStyles = {
	itemShapes: RoundedStar,
	activeFillColor: "#f09e10",
	inactiveFillColor: "#8fa3bb",
};

const Testimonials = () => {
	const [reviews, setReviews] = useState([]);
	const axiosPublic = useAxiosPublic();

	useEffect(() => {
		axiosPublic.get("/reviews.json").then(({ data }) => setReviews(data));
	}, [axiosPublic]);

	return (
		<section className='bg-white py-16 space-y-12'>
			<h2 className='font-bold text-center text-4xl'>Testimonials</h2>

			<Swiper
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				breakpoints={{ 768: { slidesPerView: 3 } }}
				centeredSlides
				className='[&_span.swiper-pagination-bullet-active]:bg-secondary [&_div.swiper-pagination]:mt-6 mx-auto [&_div.swiper-pagination]:static w-4/5 md:w-[90%]'
				grabCursor={true}
				modules={[Autoplay, Pagination]}
				pagination={{ clickable: true }}
				slidesPerView={1}
				spaceBetween={48}>
				{reviews.map((item: any, i) => (
					<SwiperSlide className='relative space-y-2' key={i}>
						<div className='flex items-center space-x-4'>
							<Avatar>
								<AvatarImage src={item.image} />
								<AvatarFallback>JP</AvatarFallback>
							</Avatar>

							<div>
								<h3 className='font-semibold'>{item.name}</h3>
								<p className='font-medium line-clamp-1 text-sm'>
									{item.status}
								</p>
							</div>
						</div>

						<p className='font-light line-clamp-3 text-sm'>
							{item.review}
						</p>

						<Rating
							className='max-w-32'
							itemStyles={itemStyles}
							readOnly
							value={item.rating || 0}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Testimonials;
