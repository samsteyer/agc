import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { sql } from '@vercel/postgres';


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true, // Use JSON Web Tokens for session instead of database sessions
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn(google_data) {
      const user = google_data.user;
      const account = google_data.account;
      const profile = google_data.profile;
      const users = await sql`SELECT id FROM users WHERE email = ${user.email}`;
      let userId;
      if (users.rows.length > 0) {
        // User exists, get their ID
        userId = users.rows[0].id;
      } else {
        const result = await sql`INSERT INTO users (email, first_name, last_name) VALUES (${user.email}, ${profile.given_name}, ${profile.family_name}) RETURNING id`;
        userId = result.rows[0].id;
      }
      // Attach userId to the user object so it can be used in the session callback
      if (userId) {
        user.id = userId;
        return true; // Continue the sign-in process
      } else {
        return false; // User not found or could not be created, do not continue sign in
      }
    },
    async jwt({ token, user }) {
      // If the user object is available, it means we're signing in
      if (user) {
        token.id = user.id; // Attach the user's ID from your database to the token
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.id

      return session
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
