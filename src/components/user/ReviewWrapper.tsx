"use client";
import useRedux from "@/hooks/useRedux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReviewForm from "@/components/user/ReviewForm";

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
	handleConfirm: Function;
	loading: boolean;
	setEditMode: Function;
}

const ReviewWrapper: React.FC<Props> = ({
	data,
	editMode,
	handleConfirm,
	loading,
	setEditMode,
}) => {
	const [rating, setRating] = useState(data.rating || 0);
	const { setConfirmData, setConfirmOpen } = useRedux();

	const onSubmit = async (values: { review: string; status: string }) => {
		const r = { rating, ...values };

		setConfirmData({
			confirm: <Button onClick={() => handleConfirm(r)}>Confirm</Button>,
			description: `This will ${
				data ? "update your" : "post a new"
			} review`,
			title: `Are you sure you want to ${
				data ? "save the changes" : "post this review"
			}?`,
		});

		setConfirmOpen(true);
	};

	return (
		<ReviewForm
			data={data}
			editMode={editMode}
			loading={loading}
			onSubmit={onSubmit}
			rating={rating}
			setRating={setRating}
			setEditMode={setEditMode}
		/>
	);
};

export default ReviewWrapper;
