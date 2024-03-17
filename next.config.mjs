/** @type {import('next').NextConfig} */

const nextConfig = {
	redirects: () => [
		{ destination: "/admin/orders", permanent: true, source: "/admin" },
		{ destination: "/user/book", permanent: true, source: "/user" },
	],
};

export default nextConfig;
