import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/login");

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <main className='max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8'>
      {/* Top Header & Breadcrumb */}
      <div className='space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6'>
        <Link
          href='/admin'
          className='inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors font-medium'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to Dashboard
        </Link>

        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2'>
              <span className='text-red-500'>#</span> Projects
            </h1>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              Manage, edit, and organize all projects shown in your portfolio.
            </p>
          </div>

          <Link
            href='/admin/projects/new'
            className='inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-all shadow-sm active:scale-[0.98] shrink-0 self-start sm:self-auto'>
            <span>+</span> New Project
          </Link>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className='flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg border border-gray-200 dark:border-gray-800'>
        <span>
          Total Projects:{" "}
          <strong className='text-gray-900 dark:text-white'>
            {projects.length}
          </strong>
        </span>
        <span>
          Featured: <strong className='text-red-500'>{featuredCount}</strong>
        </span>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className='text-center py-16 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 space-y-3'>
          <p className='text-gray-500 dark:text-gray-400 text-sm'>
            No projects created yet.
          </p>
          <Link
            href='/admin/projects/new'
            className='inline-block text-xs font-semibold text-red-500 hover:underline'>
            Create your first project →
          </Link>
        </div>
      ) : (
        <div className='grid gap-4'>
          {projects.map((project) => (
            <div
              key={project.id}
              className='group border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-sm'>
              {/* Thumbnail Container */}
              <div className='relative w-full sm:w-20 h-28 sm:h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shrink-0'>
                <Image
                  src={project.imageUrl || "/placeholder.png"}
                  alt={project.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-200'
                />
              </div>

              {/* Project Info */}
              <div className='flex-1 min-w-0 space-y-2 w-full'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <h2 className='font-semibold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors text-base truncate'>
                    {project.title}
                  </h2>

                  {project.featured && (
                    <span className='text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 shrink-0'>
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Tech Stack Pills */}
                <div className='flex flex-wrap items-center gap-1.5'>
                  {Array.isArray(project.techStack) &&
                  project.techStack.length > 0 ? (
                    project.techStack.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className='text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700/80'>
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className='text-xs text-gray-400 italic'>
                      No tech stack defined
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className='flex items-center gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800'>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className='inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-700'>
                  <svg
                    className='w-3.5 h-3.5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
