import { auth } from "@/lib/firebase.config";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { setLoading } from "@/slices/authSlice";

const useAuth = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.auth.loading);
	const user = useAppSelector((state) => state.auth.user);
	const googleProvider = new GoogleAuthProvider();

	const registerUser = (email: string, password: string) => {
		dispatch(setLoading(true));
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const loginUser = (email: string, password: string) => {
		dispatch(setLoading(true));
		return signInWithEmailAndPassword(auth, email, password);
	};

	const loginWithGoogle = () => {
		dispatch(setLoading(true));
		return signInWithPopup(auth, googleProvider);
	};

	const logoutUser = () => {
		dispatch(setLoading(true));
		return signOut(auth);
	};

	return {
		loading,
		loginUser,
		loginWithGoogle,
		logoutUser,
		registerUser,
		setLoading: (value: boolean) => dispatch(setLoading(value)),
		updateProfile,
		user,
		sendEmailVerification,
	};
};

export default useAuth;
