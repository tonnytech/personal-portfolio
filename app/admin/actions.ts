"use server";

import { prisma } from "../../lib/prisma";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const featured = formData.get("featured") === "on";

  await prisma.post.create({
    data: {
      title,
      slug: slugify(title),
      content,
      published,
      featured,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/posts");
  redirect("/admin");
}

export async function updatePost(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
   const featured = formData.get("featured") === "on";

  await prisma.post.update({
    where: { id },
    data: { title, content, published, featured, },
  });

  revalidatePath("/admin");
  revalidatePath("/posts");
  redirect("/admin");
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await prisma.post.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/posts");
}
