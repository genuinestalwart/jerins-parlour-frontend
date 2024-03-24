import { useAppDispatch } from "@/hooks/useReduxHooks";
import { setConfirmData, setConfirmOpen } from "@/slices/confirmSlice";
import { setErrorData, setErrorOpen } from "@/slices/errorSlice";

interface confirmData {
	cancel?: React.ReactNode;
	confirm: React.ReactNode;
	description: string;
	title: string;
}

const useRedux = () => {
	const dispatch = useAppDispatch();

	return {
		setConfirmData: (data: confirmData) => dispatch(setConfirmData(data)),
		setConfirmOpen: (open: boolean) => dispatch(setConfirmOpen(open)),
		setErrorData: (data: string) => dispatch(setErrorData(data)),
		setErrorOpen: (open: boolean) => dispatch(setErrorOpen(open)),
	};
};

export default useRedux;
