import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
	cancel?: React.ReactNode;
	confirm: React.ReactNode;
	description: string;
	title: string;
}

interface confirmState extends Data {
	open: boolean;
}

const initialState = {
	confirm: <></>,
	description: "",
	open: false,
	title: "",
} as confirmState;

const confirmSlice = createSlice({
	initialState,
	name: "confirm",
	reducers: {
		setConfirmData: (state, action: PayloadAction<Data>) => {
			state.cancel = action.payload.cancel;
			state.confirm = action.payload.confirm;
			state.description = action.payload.description;
			state.title = action.payload.title;
		},
		setConfirmOpen: (state, action: PayloadAction<boolean>) => {
			state.open = action.payload;
		},
	},
});

export const { setConfirmData, setConfirmOpen } = confirmSlice.actions;
export default confirmSlice.reducer;
