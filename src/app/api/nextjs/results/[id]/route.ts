import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = BigInt(params.id);
    const result = await prisma.codeReviewResult.findUnique({
      where: { id },
    });
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch result", error);
    return NextResponse.json({ error: "Failed to fetch result" }, { status: 500 });
  }
}
