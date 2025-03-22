import clientPromise from "@/util/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectionToDb from "@/util/mongooseDb";
import User from "@/models/User";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectionToDb();
        const bcrypt = require("bcrypt");
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ve şifre gereklidir");
        }
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Password is incorrect");
        }
        return { id: user._id, email: user.email, fullName: user.fullName };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id;
        token.email = user.email;
        token.name = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
