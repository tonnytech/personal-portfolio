"use server";

import { prisma } from "../../../lib/prisma";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "../../../lib/cloudinary";

async function uploadImage(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "portfolio-projects",
  });

  return result.secure_url;
}

function parseTechStack(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const repoUrl = (formData.get("repoUrl") as string) || null;
  const techStack = parseTechStack(formData.get("techStack") as string);
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File;

  // Ensure file exists and is not empty
  if (!imageFile || imageFile.size === 0) {
    throw new Error("No image file uploaded");
  }

  const imageUrl = await uploadImage(imageFile);

  await prisma.project.create({
    data: {
      title,
      description,
      imageUrl,
      liveUrl,
      repoUrl,
      techStack,
      featured,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const repoUrl = (formData.get("repoUrl") as string) || null;
  const techStack = parseTechStack(formData.get("techStack") as string);
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File;

  const data: {
    title: string;
    description: string;
    liveUrl: string | null;
    repoUrl: string | null;
    techStack: string[];
    featured: boolean;
    imageUrl?: string;
  } = { title, description, liveUrl, repoUrl, techStack, featured };

  if (imageFile && imageFile.size > 0) {
    data.imageUrl = await uploadImage(imageFile);
  }

  await prisma.project.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
