import { TableCell, TableRow } from "@/components/ui/table";
import moment from "moment";
import OrderStatus from "./OrderStatus";

interface Item {
	_id: string;
	email: string;
	name: string;
	service: { _id: string; description: string; price: number; title: string };
	status: string;
	timestamp: number;
	transactionID: string;
}

interface Props {
	handleStatus: Function;
	item: Item;
	loading: boolean;
}

const OrderTableBody: React.FC<Props> = ({ handleStatus, item, loading }) => {
	const { status, _id } = item;

	return (
		<TableRow>
			<TableCell>{item.name}</TableCell>
			<TableCell>{item.email}</TableCell>
			<TableCell>{item.service.title}</TableCell>

			<TableCell align='center'>
				{moment.unix(item.timestamp).format("D MMMM, YYYY")}
			</TableCell>

			<TableCell className='capitalize'>
				<OrderStatus
					handleStatus={handleStatus}
					loading={loading}
					status={status}
					_id={_id}
				/>
			</TableCell>
		</TableRow>
	);
};

export default OrderTableBody;
