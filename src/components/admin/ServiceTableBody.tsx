import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

interface Props {
	loading: boolean;
	onEdit: Function;
	onDelete: Function;
}

interface Item {
	_id: string;
	description: string;
	price: number;
	title: string;
}

const ServiceTableBody: React.FC<Props> = ({ loading, onEdit, onDelete }) => {
	const axiosSecure = useAxiosSecure();

	const { data = [], refetch } = useQuery({
		queryKey: ["services"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/services");
			return data;
		},
	});

	return (
		<TableBody>
			{data.toReversed().map((item: Item, i: number) => (
				<TableRow key={i}>
					<TableCell colSpan={2}>{item.title}</TableCell>
					<TableCell colSpan={4}>{item.description}</TableCell>
					<TableCell align='right'>${item.price}</TableCell>

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
	);
};

export default ServiceTableBody;
