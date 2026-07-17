import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>Projects</h1>
        <Link
          href='/admin/projects/new'
          className='bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800'>
          + New Project
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='border rounded-lg p-4 flex items-center gap-4'>
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={80}
              height={80}
              className='rounded object-cover'
            />
            <div className='flex-1'>
              <h2 className='font-semibold'>{project.title}</h2>
              <p className='text-sm text-gray-500'>
                {project.techStack.join(", ")}
              </p>
              {project.featured && (
                <span className='text-xs text-blue-600'>Featured</span>
              )}
            </div>
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className='underline text-sm'>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
