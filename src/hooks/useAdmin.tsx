import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const { data: isAdmin, isLoading } = useQuery({
		enabled: !!user,
		queryKey: ["isAdmin", user?.uid],
		queryFn: async () => {
			const res = await axiosSecure.get(`/admin/${user?.uid}`);
			return res.data?.isAdmin;
		},
	});

	return [isAdmin, isLoading];
};

export default useAdmin;
