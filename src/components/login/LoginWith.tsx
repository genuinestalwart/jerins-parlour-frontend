import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import google from "@/assets/icons/google.png";

const LoginWith = () => {
	return (
		<div className='mx-auto px-12 w-2/5'>
			<div className='flex items-center justify-evenly py-4'>
				<Separator className='w-2/5' />
				<span>Or</span>
				<Separator className='w-2/5' />
			</div>

			<Button
				className='flex rounded-full space-x-2 w-full'
				variant='outline'>
				<Image alt='google' className='h-full w-auto' src={google} />
				<span>Continue With Google</span>
			</Button>
		</div>
	);
};

export default LoginWith;
