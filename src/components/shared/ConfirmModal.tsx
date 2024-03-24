"use client";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { setConfirmOpen } from "@/slices/confirmSlice";

const ConfirmModal = () => {
	const dispatch = useAppDispatch();
	const { cancel, confirm, description, open, title } = useAppSelector(
		(state) => state.confirm
	);

	return (
		<AlertDialog
			onOpenChange={(v) => dispatch(setConfirmOpen(v))}
			open={open}>
			<AlertDialogPortal>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>

						<AlertDialogDescription>
							{description}
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						{cancel || (
							<Button
								onClick={() => dispatch(setConfirmOpen(false))}
								variant='secondary'>
								Cancel
							</Button>
						)}

						{confirm}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogPortal>
		</AlertDialog>
	);
};

export default ConfirmModal;
