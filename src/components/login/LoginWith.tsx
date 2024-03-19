import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import google from "@/assets/icons/google.png";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Spinner from "@/components/shared/Spinner";

const LoginWith = ({
	loading,
	setDisabled,
}: {
	loading: boolean;
	setDisabled: Function;
}) => {
	const { loginWithGoogle, setLoading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const handleGoogle = async () => {
		setDisabled(true);
		try {
			const res = await loginWithGoogle();
			const { email, displayName: name, uid } = res.user;
			await axiosSecure.post("/users", { email, name, uid });
		} catch (error: any) {
			toast(error.code.split("/")[1].replaceAll("-", " "));
			setLoading(false);
		}
	};

	return (
		<div className='mx-auto md:px-12 w-4/5 md:w-2/5'>
			<div className='flex items-center justify-evenly py-4'>
				<Separator className='w-2/5' />
				<span>Or</span>
				<Separator className='w-2/5' />
			</div>

			<Button
				className='flex rounded-full space-x-2 w-full'
				disabled={loading}
				onClick={() => handleGoogle()}
				variant='outline'>
				<Image alt='google' className='h-full w-auto' src={google} />
				<span>Continue With Google</span>
				{loading && <Spinner className='fill-primary h-6 w-6' />}
			</Button>
		</div>
	);
};

export default LoginWith;
