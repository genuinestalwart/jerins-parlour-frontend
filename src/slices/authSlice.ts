import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface authState {
	loading: boolean;
	user: User | null;
}

const initialState = {
	loading: true,
	user: null,
} as authState;

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
	},
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
