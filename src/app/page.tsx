import ContactUs from "@/components/home/ContactUs";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Summary from "@/components/home/Summary";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const HomePage = () => {
	return (
		<>
			<Header />

			<main className='bg-home'>
				<Hero />
				<Services />
				<Summary />
				<Testimonials />
				<ContactUs />
			</main>

			<Footer />
		</>
	);
};

export default HomePage;
