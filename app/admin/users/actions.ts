"use server";

import { prisma } from "../../../lib/prisma";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function toggleAdmin(userId: string, makeAdmin: boolean) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/login");

  await prisma.user.update({
    where: { id: userId },
    data: { isAdmin: makeAdmin },
  });

  revalidatePath("/admin/users");
}
