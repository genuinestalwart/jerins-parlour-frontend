"use client";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ServiceFormCard from "@/components/admin/ServiceFormCard";
import useRedux from "@/hooks/useRedux";

interface Props {
	confirmData: { description: string; title: string };
	dv: { description: string; title: string };
	editOpen: boolean;
	loading: boolean;
	handleConfirm: Function;
	setEditOpen: Function;
}

const formSchema = z.object({
	description: z.coerce.string().trim().min(50).max(512),
	title: z.coerce.string().trim().min(5).max(50),
});

const ServiceForm: React.FC<Props> = ({
	confirmData,
	dv,
	editOpen,
	loading,
	handleConfirm,
	setEditOpen,
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
			...confirmData,
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
