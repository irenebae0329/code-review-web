import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string // ⚡ 新增字段
    user?:{
      account?:string
      accounts?:{
        provider:string
        access_token:string
      }[]
    }
  }

}