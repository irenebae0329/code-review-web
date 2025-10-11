import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
      authorized: ({ token }) => !!token, // 有 token 才允许访问
    },
    pages: {
      signIn: "/api/auth/signin", // 未登录跳转
    },
  })


export const config = {
  matcher: [
    "/projects/:path*",
    "/api/projects/:path*",
    "/",
  ],
};

