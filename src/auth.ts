import { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
console.log(process.env.GITHUB_ID, process.env.GITHUB_SECRET,111)
export const defaultAuthOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

};


