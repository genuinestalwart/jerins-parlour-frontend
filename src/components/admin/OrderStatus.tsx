"use client";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useRedux from "@/hooks/useRedux";
import { useEffect, useState } from "react";

interface Props {
	_id: string;
	handleStatus: Function;
	loading: boolean;
	status: string;
}
const cancelButton = (handleCancel: Function) => (
	<Button onClick={() => handleCancel()} variant='secondary'>
		Cancel
	</Button>
);

const OrderStatus: React.FC<Props> = ({
	_id,
	handleStatus,
	loading,
	status,
}) => {
	const [newStatus, setNewStatus] = useState(status);
	const { setConfirmData, setConfirmOpen } = useRedux();

	useEffect(() => {
		if (!!status && newStatus !== status) {
			setConfirmData({
				cancel: cancelButton(() => {
					setNewStatus(status);
					setConfirmOpen(false);
				}),
				confirm: (
					<Button onClick={() => handleStatus(newStatus, _id)}>
						Confirm
					</Button>
				),
				description: "This will update the status immediately.",
				title: "Are you sure you want to change the status of this booking?",
			});

			setConfirmOpen(true);
		}
	}, [newStatus, status]);

	return (
		<Select
			disabled={loading}
			onValueChange={setNewStatus}
			value={newStatus}>
			<SelectTrigger
				className={`font-medium text-white ${
					newStatus === "pending"
						? "bg-red-500"
						: newStatus === "done"
						? "bg-lime-500"
						: "bg-yellow-500"
				}
					`}>
				<SelectValue placeholder={newStatus} />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value='pending'>Pending</SelectItem>
				<SelectItem value='ongoing'>Ongoing</SelectItem>
				<SelectItem value='done'>Done</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default OrderStatus;
