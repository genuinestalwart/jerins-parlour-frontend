import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Item {
	image: string;
	name: string;
	rating: number;
	review: string;
	status: string;
}

const itemStyles = {
	itemShapes: RoundedStar,
	activeFillColor: "#f09e10",
	inactiveFillColor: "#8fa3bb",
};

const ReviewSlides = ({ reviews }: { reviews: Array<Item> }) => {
	return (
		<Swiper
			autoplay={{ delay: 4000, disableOnInteraction: false }}
			breakpoints={{ 768: { slidesPerView: 3 } }}
			centeredSlides
			className='[&_span.swiper-pagination-bullet-active]:bg-secondary [&_div.swiper-pagination]:mt-6 mx-auto [&_div.swiper-pagination]:static w-4/5 md:w-[90%]'
			grabCursor={true}
			modules={[Autoplay, Pagination]}
			pagination={{ clickable: true }}
			slidesPerView={1}
			spaceBetween={64}>
			{reviews.map((item: Item, i) => (
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
	);
};

export default ReviewSlides;
