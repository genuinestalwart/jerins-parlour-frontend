import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { setErrorOpen } from "@/slices/errorSlice";

const ErrorModal = () => {
	const dispatch = useAppDispatch();
	const { description, open } = useAppSelector((state) => state.error);

	return (
		<Dialog onOpenChange={(v) => dispatch(setErrorOpen(v))} open={open}>
			<DialogPortal>
				<DialogOverlay />

				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Error</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button>Okay</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};

export default ErrorModal;
