import { NextResponse } from "next/server";
import type { Commit } from "@/types/project";

function generateMockCommits(projectId: string): Commit[] {
  const now = Date.now();
  const authors = ["Alice", "Bob", "Carol", "Dave"];
  const messages = [
    "feat: 初始化项目结构",
    "fix: 修复构建错误",
    "docs: 更新 README 指南",
    "refactor: 优化组件结构",
    "chore: 升级依赖",
  ];
  return Array.from({ length: 8 }).map((_, i) => {
    const committedAt = new Date(now - i * 6 * 60 * 60 * 1000).toISOString();
    return {
      id: `${projectId}-c${i + 1}`,
      message: messages[i % messages.length],
      author: authors[i % authors.length],
      committedAt,
      hash: Math.random().toString(36).slice(2, 9),
      status: i % 5 === 0 ? "warning" : "success",
    } satisfies Commit;
  });
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;
  const commits = generateMockCommits(id);
  return NextResponse.json(commits);
}


