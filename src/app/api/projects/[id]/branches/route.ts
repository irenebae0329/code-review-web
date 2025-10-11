import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 你需要在环境变量设置你的token
const GITHUB_OWNER = process.env.GITHUB_OWNER || "your-org"; // 或者在环境变量设置仓库owner
const GITHUB_REPO_PREFIX = process.env.GITHUB_REPO_PREFIX || ""; // 如果项目id和仓库名有映射关系，可补实现

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;
  
  // 仓库名推断（一般id即仓库名，如果有特殊规则可以自定义）
  const repoName = `${GITHUB_REPO_PREFIX}${id}`;

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repoName}/branches`;

  const res = await fetch(url, {
    headers: {
      "Accept": "application/vnd.github+json",
      ...(GITHUB_TOKEN
        ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
        : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch branches from GitHub." },
      { status: res.status }
    );
  }

  const data = await res.json();

  // 只返回需要的字段
  const branches = Array.isArray(data)
    ? data.map((b: { name: string; commit: { sha: string; url: string }; protected: boolean }) => ({
        name: b.name,
        commit: {
          sha: b.commit?.sha,
          url: b.commit?.url,
        },
        protected: b.protected,
      }))
    : [];

  return NextResponse.json(branches);
}
