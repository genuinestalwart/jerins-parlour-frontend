import Image from "next/image";
import notFound from "@/assets/shared/not-found.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className='flex flex-col h-screen justify-center 2xl:max-h-[810px] space-y-4'>
			<Image
				alt='page not found'
				className='w-4/5 md:w-2/5 lg:w-1/3 mx-auto'
				priority
				src={notFound}
			/>

			<Button asChild className='max-w-fit mx-auto'>
				<Link href='/' scroll={false}>
					Back to Home
				</Link>
			</Button>
		</div>
	);
};

export default NotFoundPage;
