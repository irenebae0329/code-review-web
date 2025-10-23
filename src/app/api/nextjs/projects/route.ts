import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { defaultAuthOptions } from "@/auth";
import type { Project } from "@/types/project";
import { fetchGitHubProjects } from "@/lib/github";

export async function GET() {
  // 根据用户github sso信息，获取用户帐号下的所有仓库
  // 本路由需要鉴权，读取 token 后访问 GitHub API
  try{
    const projects: Project[] = await fetchGitHubProjects();
    return NextResponse.json(projects);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      console.error("Error fetching GitHub projects:", error);
      return NextResponse.json({ error: "Failed to fetch GitHub projects" }, { status: 500 });
    }
  }
}



