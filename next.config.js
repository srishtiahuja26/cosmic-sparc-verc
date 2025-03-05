/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['utfs.io'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
			},
			{
				protocol: "https",
				hostname: "ypq207ag33.ufs.sh",
			  },
		],
	},
};

module.exports = nextConfig;
