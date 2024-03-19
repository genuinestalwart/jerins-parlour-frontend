"use client";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ServiceFormCard from "@/components/admin/ServiceFormCard";
import useRedux from "@/hooks/useRedux";

interface Item {
	description: string;
	title: string;
}

const formSchema = z.object({
	description: z.coerce.string().trim().min(50).max(512),
	title: z.coerce.string().trim().min(5).max(50),
});

const data = [
	{
		description: "This will add a new service to the database.",
		title: "Are you sure you want to add this item?",
	},
	{
		description: "This will update the service details.",
		title: "Are you sure you want to save the changes?",
	},
];

const ServiceForm = ({
	dv,
	editOpen,
	loading,
	handleConfirm,
	setEditOpen,
}: {
	dv: Item;
	editOpen: boolean;
	loading: boolean;
	handleConfirm: Function;
	setEditOpen: Function;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { description: dv.description, title: dv.title },
		resolver: zodResolver(formSchema),
	});

	const { setConfirmData, setConfirmOpen } = useRedux();
	const { isValid } = form.formState;

	const onSubmit = async (v: object) => {
		setConfirmData({
			confirm: <Button onClick={() => handleConfirm(v)}>Confirm</Button>,
			...data[editOpen ? 1 : 0],
		});

		setConfirmOpen(true);
	};

	return (
		<Form {...form}>
			<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
				<ServiceFormCard form={form} loading={loading} />

				<div className='flex justify-between'>
					{editOpen && (
						<Button
							onClick={() => setEditOpen(false)}
							variant='secondary'>
							Go Back
						</Button>
					)}

					<Button
						className='flex items-center space-x-2'
						disabled={loading || !isValid}
						type='submit'>
						{loading && (
							<Spinner className='fill-primary h-6 w-6' />
						)}

						<span>{editOpen ? "Save Changes" : "Add Service"}</span>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ServiceForm;
