
import NextAuth from "next-auth/";
import type { User, Account, Profile } from "next-auth/";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

// This file configures NextAuth for authentication using GitHub as the provider.
// It handles user sign-in, JWT token creation, and session management.
// The signIn callback checks if the user exists in Sanity and creates a new author if not.
// The jwt callback fetches the author from Sanity using the user's email,
// and sets the token.id to the Sanity author _id.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
   async signIn({
      user,
      profile,
    }: {
      user: User;
      account?: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      const { name, email, image } = user;
      // GitHub profile fields may be on `profile`
      const { id, login, bio } = profile ?? {};
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      if (!existingUser && id) {
        await writeClient.create({
          _type: "author",
          _id: id,
          id,
          name: name ?? "",
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    
    
    async jwt({ token, user }) {
      // Fetch the author from Sanity using the user's GitHub id
      if (user && user.email) {
        const author = await client.fetch(
          `*[_type == "author" && email == $email][0]{ _id }`,
          { email: user.email }
        );
        if (author?._id) {
          token.id = author._id; // Set token.id to the Sanity author _id
        }
      }
      return token;
    },

    // This callback is called whenever a session is checked
    // It ensures that the session.user object is correctly populated with the user id
    async session({ session, token }) {
      if (token.id) {
        // Ensure session.user exists and is typed correctly
        session.user = { ...session.user, id: String(token.id) };
      }
      return session;
    },
  },
});