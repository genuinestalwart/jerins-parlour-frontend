import axios from "axios";

const axiosPublic = axios.create({
	baseURL: "https://jerins-parlour-backend.vercel.app/",
});

const useAxiosPublic = () => axiosPublic;
export default useAxiosPublic;
