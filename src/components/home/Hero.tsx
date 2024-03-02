import { Button } from "@/components/ui/button";
import hero from "@/assets/images/hero.png";
import Image from "next/image";

const Hero = () => {
	return (
		<section className='flex flex-col md:flex-row items-center 2xl:max-h-[810px] min-h-[calc(100vh_-_6rem)] mx-auto pb-8 md:pb-0 space-y-8 md:space-y-0 w-4/5 md:w-[90%]'>
			<Image
				alt='hero'
				className='h-auto mx-auto md:order-1 md:w-1/3'
				priority
				src={hero}
			/>

			<div className='space-y-8 md:w-2/5'>
				<h1 className='font-bold text-5xl uppercase'>
					Beauty Salon for Every Woman
				</h1>

				<p className='leading-relaxed text-sm'>
					Explore our unique collection of handpicked decor and
					fashion-forward accessories designed to elevate your
					lifestyle. Redefine your surroundings and embrace the
					artistry of living with us.
				</p>

				<Button className='md:px-6'>Get An Appointment</Button>
			</div>
		</section>
	);
};

export default Hero;
