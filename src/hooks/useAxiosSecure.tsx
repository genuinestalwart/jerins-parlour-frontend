import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
	baseURL: "https://jerins-parlour-backend.vercel.app/",
});

const useAxiosSecure = () => {
	const { logoutUser, user } = useAuth();

	useEffect(() => {
		const secureRequest = axiosSecure.interceptors.request.use(
			async (config) => {
				const token = await user?.getIdToken(true);
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			},
			(error) => Promise.reject(error)
		);

		const secureResponse = axiosSecure.interceptors.response.use(
			(response) => response,
			async (error) => {
				if ([401, 403].includes(error.response.status)) {
					await logoutUser();
				}

				return Promise.reject(error);
			}
		);

		return () => {
			axiosSecure.interceptors.request.eject(secureRequest);
			axiosSecure.interceptors.response.eject(secureResponse);
		};
	}, [logoutUser, user]);

	return axiosSecure;
};
export default useAxiosSecure;
