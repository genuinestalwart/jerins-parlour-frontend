import authReducer from "@/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	reducer: { auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
