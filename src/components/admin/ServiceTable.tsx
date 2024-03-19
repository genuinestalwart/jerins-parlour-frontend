import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRedux from "@/hooks/useRedux";

interface Item {
	_id: string;
	description: string;
	title: string;
}

const ServiceTable = ({
	loading,
	onEdit,
	handleDelete,
}: {
	loading: boolean;
	onEdit: Function;
	handleDelete: Function;
}) => {
	const axiosSecure = useAxiosSecure();
	const { setConfirmData, setConfirmOpen } = useRedux();

	const { data = [], refetch } = useQuery({
		queryKey: ["services"],
		queryFn: async () => {
			const res = await axiosSecure.get(`/services`);
			return res.data;
		},
	});

	const onDelete = (i: Item, r: Function) => {
		setConfirmData({
			confirm: <Button onClick={() => handleDelete(i, r)}>Delete</Button>,
			description: "This will delete the service permanently.",
			title: "Are you sure you want to delete this item?",
		});

		setConfirmOpen(true);
	};

	return (
		<Table className='bg-white break-words md:table-fixed'>
			<TableHeader>
				<TableRow>
					<TableHead colSpan={2}>Title</TableHead>
					<TableHead colSpan={4}>Description</TableHead>
					<TableHead>Edit</TableHead>
					<TableHead>Delete</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{data.toReversed().map((item: Item, i: number) => (
					<TableRow key={i}>
						<TableCell colSpan={2}>{item.title}</TableCell>
						<TableCell colSpan={4}>{item.description}</TableCell>

						<TableCell align='center'>
							<Button
								disabled={loading}
								onClick={() => onEdit(item)}
								size='icon'
								variant='secondary'>
								<Pencil />
							</Button>
						</TableCell>

						<TableCell align='center'>
							<Button
								disabled={loading}
								onClick={() => onDelete(item, refetch)}
								size='icon'
								variant='destructive'>
								<Trash2 />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ServiceTable;
