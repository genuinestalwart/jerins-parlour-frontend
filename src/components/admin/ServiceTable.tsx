import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useRedux from "@/hooks/useRedux";
import ServiceTableBody from "@/components/admin/ServiceTableBody";

interface Props {
	loading: boolean;
	onEdit: Function;
	handleDelete: Function;
}

interface Item {
	_id: string;
	description: string;
	title: string;
}

const ServiceTable: React.FC<Props> = ({ loading, onEdit, handleDelete }) => {
	const { setConfirmData, setConfirmOpen } = useRedux();

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
					<TableHead>Price</TableHead>
					<TableHead>Edit</TableHead>
					<TableHead>Delete</TableHead>
				</TableRow>
			</TableHeader>

			<ServiceTableBody
				loading={loading}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</Table>
	);
};

export default ServiceTable;
