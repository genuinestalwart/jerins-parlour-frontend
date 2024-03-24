import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";

interface Item {
	service: { _id: string; description: string; price: number; title: string };
	status: string;
	timestamp: number;
	transactionID: string;
}

const BookingCard = ({ item }: { item: Item }) => {
	const copy = () => navigator.clipboard.writeText(item.transactionID);

	return (
		<Card className='flex flex-col'>
			<CardHeader className='pb-0'>
				<CardTitle className='text-lg'>{item.service.title}</CardTitle>

				<CardDescription className='italic'>
					Booked at:{" "}
					{moment.unix(item.timestamp).format("D MMMM, YYYY")}
				</CardDescription>
			</CardHeader>

			<CardContent className='flex-grow py-4'>
				{item.service.description}
			</CardContent>

			<CardFooter className='justify-between text-sm'>
				<TooltipProvider delayDuration={300}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button onClick={() => copy()} size='sm'>
								Transaction ID
							</Button>
						</TooltipTrigger>

						<TooltipContent>Click to Copy</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<Badge
					className={`capitalize px-3 py-1 text-sm ${
						item.status === "pending"
							? "bg-red-500"
							: item.status === "done"
							? "bg-lime-500"
							: "bg-yellow-500"
					}
					`}>
					{item.status}
				</Badge>
			</CardFooter>
		</Card>
	);
};

export default BookingCard;
