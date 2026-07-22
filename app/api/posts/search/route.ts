import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const tag = searchParams.get("tag");

  if (tag) {
    const posts = await prisma.post.findMany({
      where: { published: true, tags: { has: tag } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  }

  if (q) {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  }

  return NextResponse.json([]);
}
