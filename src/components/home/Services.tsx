import { Button } from "@/components/ui/button";
import services1 from "@/assets/icons/services-1.png";
import services2 from "@/assets/icons/services-2.png";
import services3 from "@/assets/icons/services-3.png";
import Image from "next/image";

const serviceInfo = [
	{
		icon: services1,
		title: "Anti Age Face Treatment",
		price: 199,
		text: "We craft stunning and amazing web UI, using a well drrafted UX to fit your product.",
	},
	{
		icon: services2,
		title: "Hair Color & Styleing",
		price: 99,
		text: "Amazing flyers, social media posts and brand representations that would make your brand stand out.",
	},
	{
		icon: services3,
		title: "Skin Care Treatment",
		price: 299,
		text: "With well written codes, we build amazing apps for all platforms, mobile and web apps in general.",
	},
];

const Services = () => {
	return (
		<section className='bg-white py-16 space-y-8'>
			<h2 className='font-bold text-center text-4xl'>
				Our Awesome <span className='text-primary'>Services</span>
			</h2>

			<div className='cursor-pointer gap-12 grid grid-cols-1 md:grid-cols-3 mx-auto w-4/5 md:w-[90%]'>
				{serviceInfo.map((info, i) => (
					<div
						className='flex flex-col p-6 rounded-lg hover:shadow-2xl space-y-2 text-center'
						key={i}>
						<Image
							alt='service icon'
							className='mx-auto w-1/5'
							src={info.icon}
						/>

						<h3 className='font-semibold text-lg'>{info.title}</h3>

						<p className='font-semibold text-primary'>
							${info.price}
						</p>

						<p className='font-light text-sm'>{info.text}</p>
					</div>
				))}
			</div>

			<Button className='block mx-auto'>Explore More</Button>
		</section>
	);
};

export default Services;
