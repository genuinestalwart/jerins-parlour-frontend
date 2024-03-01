import summary from "@/assets/images/summary.png";
import Image from "next/image";

const Summary = () => {
	return (
		<section className='md:flex items-center mx-auto py-16 space-y-8 md:space-y-8 w-[90%]'>
			<Image
				alt='hero'
				className='h-auto md:w-1/2'
				priority
				src={summary}
			/>

			<div className='mx-auto space-y-8 md:w-2/5'>
				<h2 className='font-bold text-4xl uppercase'>
					Let Us Handle Your Skin{" "}
					<span className='text-primary'>Professionally</span>.
				</h2>

				<p className='leading-relaxed text-sm'>
					With well written codes, we build amazing apps for all
					platforms, mobile and web apps in general ipsum.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Purus commodo
					ipsum.
				</p>

				<div className='flex space-x-8'>
					<div className='space-y-2'>
						<h3 className='font-bold text-primary text-4xl'>
							500+
						</h3>

						<p className='font-semibold'>Happy Customers</p>
					</div>

					<div className='space-y-2'>
						<h3 className='font-bold text-primary text-4xl'>16+</h3>
						<p className='font-semibold'>Total Service</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Summary;
