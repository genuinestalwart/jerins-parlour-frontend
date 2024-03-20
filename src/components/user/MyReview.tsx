import { Rating, RoundedStar } from "@smastrom/react-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Review {
	image: string;
	name: string;
	rating: number;
	review: string;
	status: string;
}

interface Props {
	data: Review;
	setEditMode: Function;
}

const itemStyles = {
	itemShapes: RoundedStar,
	activeFillColor: "#f09e10",
	inactiveFillColor: "#8fa3bb",
};

const MyReview: React.FC<Props> = ({ data, setEditMode }) => {
	return (
		<div className='bg-white p-8 relative rounded-lg space-y-2 md:w-1/2'>
			<div className='flex items-center space-x-4'>
				<Avatar>
					<AvatarImage src={data.image} />
					<AvatarFallback>JP</AvatarFallback>
				</Avatar>

				<div>
					<h3 className='font-semibold'>{data.name}</h3>
					<p className='font-medium line-clamp-1 text-sm'>
						{data.status}
					</p>
				</div>
			</div>

			<p className='font-light text-sm'>{data.review}</p>

			<div className='flex items-center justify-between'>
				<Rating
					className='max-w-32'
					itemStyles={itemStyles}
					readOnly
					value={data.rating}
				/>

				<Button onClick={() => setEditMode(true)}>Edit</Button>
			</div>
		</div>
	);
};

export default MyReview;
