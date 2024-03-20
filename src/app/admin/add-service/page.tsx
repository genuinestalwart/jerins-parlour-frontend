"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ServiceForm from "@/components/admin/ServiceForm";
import useRedux from "@/hooks/useRedux";

const AddServicePage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const axiosSecure = useAxiosSecure();
	const { setConfirmOpen, setErrorData, setErrorOpen } = useRedux();

	const handleConfirm = async (values: object) => {
		setLoading(true);
		setConfirmOpen(false);

		try {
			await axiosSecure.post("/services", values);
			router.push("/admin/manage-services", { scroll: false });
		} catch (error) {
			setErrorData("Unable to add the service to the list");
			setErrorOpen(true);
			setLoading(false);
		}
	};

	return (
		<section className='p-8'>
			<ServiceForm
				confirmData={{
					description: "This will add a new service to the database.",
					title: "Are you sure you want to add this item?",
				}}
				dv={{ description: "", title: "" }}
				editOpen={false}
				handleConfirm={handleConfirm}
				loading={loading}
				setEditOpen={() => {}}
			/>
		</section>
	);
};

export default AddServicePage;
