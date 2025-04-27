import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { sql } from '@vercel/postgres';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

interface UserJWT extends JWT {
  id?: number | string;
}

interface UserSession extends Session {
  user: {
    id?: number | string; // NextAuth may treat IDs as strings
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// Extend the built-in user interface
declare module "next-auth" {
  interface User {
    id?: string | number;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for session instead of database sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email || !profile) return false;
      
      try {
        const users = await sql`SELECT id FROM users WHERE email = ${user.email}`;
        let userId: string;
        
        if (users.rows.length > 0) {
          // User exists, get their ID
          userId = String(users.rows[0].id);
        } else {
          const result = await sql`
            INSERT INTO users (email, first_name, last_name) 
            VALUES (${user.email}, ${(profile as any).given_name || ''}, ${(profile as any).family_name || ''}) 
            RETURNING id
          `;
          userId = String(result.rows[0].id);
        }
        
        // Attach userId to the user object so it can be used in the session callback
        if (userId) {
          user.id = userId;
          return true; // Continue the sign-in process
        } else {
          return false; // User not found or could not be created, do not continue sign in
        }
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
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
      if ((token as UserJWT).id) {
        (session as UserSession).user.id = (token as UserJWT).id;
      }

      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };