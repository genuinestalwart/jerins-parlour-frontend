import authReducer from "@/slices/authSlice";
import confirmReducer from "@/slices/confirmSlice";
import errorReducer from "@/slices/errorSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	reducer: {
		auth: authReducer,
		confirm: confirmReducer,
		error: errorReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
