import { defaultAuthOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Branch = {
  name: string;
}
export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const getAccessTokenFromSession = async () => {
    const session = await getServerSession(defaultAuthOptions);
    let token = session?.accessToken;
    if (!token && session?.user && Array.isArray(session.user.accounts)) {
      const gh = session.user.accounts.find((a: { provider: string; access_token: string }) => a.provider === "github");
      if (gh?.access_token) token = gh.access_token;
    }
    return token;
  };

  const getGithubLoginFromToken = async (token: string) => {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const user = await res.json();
    return user?.login as string | null;
  };

  const { id } = await context.params;
  const token = await getAccessTokenFromSession();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const owner = await getGithubLoginFromToken(token);
  if (!owner) {
    return NextResponse.json({ error: "Unable to resolve GitHub owner" }, { status: 400 });
  }

  const url = `https://api.github.com/repos/${owner}/${id}/branches`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
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
  console.log(data);
  const branches = Array.isArray(data)
    ? data.map((b: Branch) => ({
        name: b.name,
        id: b.name,
      }))
    : [];

  return NextResponse.json(branches);
}
