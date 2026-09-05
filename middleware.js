// Gate every /admin route behind a valid NextAuth session.
// /admin/login is public so an admin can actually sign in.
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/admin/login' },
});

export const config = {
  matcher: ['/admin/((?!login).*)', '/admin'],
};
