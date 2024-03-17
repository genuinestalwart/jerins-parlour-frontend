import Image from "next/image";
import loading from "@/assets/shared/loading.gif";

const PageLoading = () => {
	return (
		<main className='flex h-screen items-center 2xl:max-h-[810px]'>
			<Image
				alt='loading'
				className='mx-auto sm:w-1/2 md:w-1/3'
				priority
				src={loading}
			/>
		</main>
	);
};

export default PageLoading;
