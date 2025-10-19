import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { defaultAuthOptions } from "@/auth";
import { GitHubRepo, Project } from "@/types/project";




export async function GET() {
  // 根据用户github sso信息，获取用户帐号下的所有仓库
  // 本路由需要鉴权，读取 token 后访问 GitHub API
  

  const GITHUB_API_URL = "https://api.github.com";

  const getAccessTokenFromSession = async () => {
    const session = await getServerSession(defaultAuthOptions);
    // next-auth的github provider下，session?.accessToken 一般可用
    // 但如无accessToken，可适配session?.token?.access_token等结构
    let token = session?.accessToken
    if (!token && session?.user && Array.isArray(session.user.accounts)) {
      // union多provider时，尝试取github的
      const gh = session.user.accounts.find((a: { provider: string; access_token: string; }) => a.provider === "github");
      if (gh?.access_token) token = gh.access_token;
    }
    return token;
  };

  // 获取用户自己的github仓库（private+public）
  const fetchUserRepos = async (token: string) => {
    // 支持分页，这里只取前100条
    // 定义返回github仓库类型（部分字段）

    const res = await fetch(`${GITHUB_API_URL}/user/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch GitHub repos");
    return res.json();
  };

    const token = await getAccessTokenFromSession();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const ghRepos = await fetchUserRepos(token);

    // 只返回部分核心字段并转为Project
    const projects: Project[] = (Array.isArray(ghRepos) ? ghRepos : []).map((r: GitHubRepo) => ({
      id: r.name,
      name: r.name,
      description: r.description || "",
      status: r.archived ? "archived" : r.private ? "paused" : "active",
      updatedAt: r.updated_at,
    }));
    return NextResponse.json(projects);
}


