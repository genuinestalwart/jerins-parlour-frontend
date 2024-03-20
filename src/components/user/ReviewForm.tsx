"use client";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ReviewFormCard from "@/components/user/ReviewFormCard";

interface Data {
	image: string;
	name: string;
	rating: number;
	review: string;
	status: string;
	uid: string;
}

interface Props {
	data: Data;
	editMode: boolean;
	loading: boolean;
	onSubmit: SubmitHandler<any>;
	rating: number;
	setRating: Function;
	setEditMode: Function;
}

const formSchema = z.object({
	review: z.coerce.string().trim().min(50).max(512),
	status: z.coerce.string().trim().min(5).max(50),
});

const ReviewForm: React.FC<Props> = ({
	data,
	editMode,
	loading,
	onSubmit,
	rating,
	setRating,
	setEditMode,
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { review: data.review || "", status: data.status || "" },
		resolver: zodResolver(formSchema),
	});

	const { isValid } = form.formState;

	return (
		<Form {...form}>
			<form
				className='space-y-6 md:w-1/2'
				onSubmit={form.handleSubmit(onSubmit)}>
				<ReviewFormCard
					form={form}
					loading={loading}
					rating={rating}
					setRating={setRating}
				/>

				<div className='flex justify-between'>
					{editMode && (
						<Button
							onClick={() => setEditMode(false)}
							variant='secondary'>
							Go Back
						</Button>
					)}

					<Button
						className='flex items-center space-x-2'
						disabled={loading || !isValid || !rating}
						type='submit'>
						{loading && (
							<Spinner className='fill-primary h-6 w-6' />
						)}

						<span>{editMode ? "Save Changes" : "Post Review"}</span>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ReviewForm;
