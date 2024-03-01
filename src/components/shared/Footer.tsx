import { MapPin } from "lucide-react";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instagram.png";
import linkedin from "@/assets/icons/linkedin.png";
import youtube from "@/assets/icons/youtube.png";
import Image from "next/image";

const icons = [
	{ alt: "facebook", icon: facebook },
	{ alt: "instagram", icon: instagram },
	{ alt: "linkedin", icon: linkedin },
	{ alt: "youtube", icon: youtube },
];

const Footer = () => {
	return (
		<footer className='bg-primary pb-12 text-sm'>
			<div className='md:flex justify-between mx-auto py-12 space-y-8 md:space-y-0 w-[90%]'>
				<div className='md:flex md:space-x-4 space-y-2 md:space-y-0 text-center md:text-left'>
					<MapPin className='mx-auto' />

					<p>
						H#000 (0th Floor), Road #00,
						<br />
						New DOHS, Mohakhali, Dhaka, Bangladesh
					</p>
				</div>

				<div className='flex justify-evenly md:justify-between md:w-1/4'>
					<div className='space-y-2 md:space-y-6'>
						<h3 className='font-medium text-lg'>Company</h3>

						<ul className='space-y-2 *:hover:underline *:underline-offset-2'>
							<li>About Us</li>
							<li>Project</li>
							<li>Our Team</li>
							<li>Terms of Service</li>
						</ul>
					</div>

					<div className='space-y-2 md:space-y-6'>
						<h3 className='font-medium text-lg'>Quick Links</h3>

						<ul className='space-y-2 *:hover:underline *:underline-offset-2'>
							<li>Rentals</li>
							<li>Sales</li>
							<li>Contact Us</li>
							<li>Our Blog</li>
						</ul>
					</div>
				</div>

				<div className='space-y-4 text-center md:text-left md:w-1/4'>
					<h3 className='font-medium text-lg'>About Us</h3>

					<p>
						Elevate your space with curated elegance. Transform your
						space into a canvas of self-expression with Jerins.
					</p>

					<div className='flex justify-center md:justify-start space-x-6'>
						{icons.map((item, i) => (
							<Image
								alt={item.alt}
								className='h-6 w-6'
								key={i}
								src={item.icon}
							/>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
