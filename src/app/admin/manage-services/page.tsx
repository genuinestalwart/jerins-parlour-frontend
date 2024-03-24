"use client";
import ServiceForm from "@/components/admin/ServiceForm";
import ServiceTable from "@/components/admin/ServiceTable";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import useRedux from "@/hooks/useRedux";

interface Item {
	_id: string;
	description: string;
	price: number;
	title: string;
}

const ManageServicesPage = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const dv = { _id: "", description: "", price: 1, title: "" };
	const [item, setItem] = useState(dv);
	const axiosSecure = useAxiosSecure();
	const { setConfirmOpen, setErrorData, setErrorOpen } = useRedux();

	const handleConfirm = async (values: object) => {
		setLoading(true);
		setConfirmOpen(false);

		try {
			await axiosSecure.patch(`/services/${item?._id}`, values);
			setEditOpen(false);
		} catch (error) {
			setErrorData("Unable to add the service to the list");
			setErrorOpen(true);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (item: Item, refetch: Function) => {
		setConfirmOpen(false);
		setLoading(true);

		try {
			await axiosSecure.delete(`/services/${item._id}`);
			await refetch();
		} catch (error) {
			setErrorData("Unable to delete the service.");
			setErrorOpen(true);
		} finally {
			setLoading(false);
		}
	};

	const onEdit = (item: Item) => {
		setItem(item);
		setEditOpen(true);
	};

	return (
		<section className='p-8'>
			{editOpen ? (
				<ServiceForm
					confirmData={{
						description: "This will update the service details.",
						title: "Are you sure you want to save the changes?",
					}}
					dv={item}
					editOpen={editOpen}
					handleConfirm={handleConfirm}
					loading={loading}
					setEditOpen={setEditOpen}
				/>
			) : (
				<ServiceTable
					handleDelete={handleDelete}
					loading={loading}
					onEdit={onEdit}
				/>
			)}
		</section>
	);
};

export default ManageServicesPage;
