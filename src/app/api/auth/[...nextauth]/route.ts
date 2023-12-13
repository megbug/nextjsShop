import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

// authOptions contains the nextAuth configuration

export const authOptions: NextAuthOptions = {
    // PrismaAdapter lets us save user info and session data in mongoDB using Prisma
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    providers: [
        Google({
            // googleProvider expects defined values for clientId and clientSecret 
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        session({session, user}) {
            session.user.id = user.id
            return session;
        },
    },
    events: {
        async signIn({user}) {
            await mergeAnonymousCartIntoUserCart(user.id)
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }