"use client";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { auth } from "@/lib/firebase.config";
import store from "@/lib/store";
import { setLoading, setUser } from "@/slices/authSlice";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConfirmModal from "@/components/shared/ConfirmModal";
import ErrorModal from "@/components/shared/ErrorModal";
const client = new QueryClient();

const Observer = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
			dispatch(setUser(user));
			dispatch(setLoading(false));
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <></>;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={client}>
			<ReduxProvider store={store}>
				<Observer />
				{children}
				<ConfirmModal />
				<ErrorModal />
			</ReduxProvider>
		</QueryClientProvider>
	);
};

export default Providers;
