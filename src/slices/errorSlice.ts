import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface errorState {
	description: string;
	open: boolean;
}

const initialState = {
	description: "",
	open: false,
} as errorState;

const errorSlice = createSlice({
	initialState,
	name: "error",
	reducers: {
		setErrorData: (state, action: PayloadAction<string>) => {
			state.description = action.payload;
		},
		setErrorOpen: (state, action: PayloadAction<boolean>) => {
			state.open = action.payload;
		},
	},
});

export const { setErrorData, setErrorOpen } = errorSlice.actions;
export default errorSlice.reducer;
