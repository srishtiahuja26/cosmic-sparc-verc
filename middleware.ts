import { withAuth } from 'next-auth/middleware'

export default withAuth(
	function middleware(req) {
		// Your custom middleware logic here
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token
		},
	}
)

export const config = {
	matcher: [
		'/admin/:path*',
		'/events/:path*/register'
	]
}
