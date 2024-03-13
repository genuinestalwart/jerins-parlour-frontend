"use client";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { auth } from "@/lib/firebase.config";
import store from "@/lib/store";
import { setLoading, setUser } from "@/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Provider } from "react-redux";

const Observer = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
			dispatch(setUser(currentUser));
			dispatch(setLoading(false));
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <></>;
};

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<Observer />
			{children}
		</Provider>
	);
};

export default ReduxProvider;
