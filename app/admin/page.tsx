import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const isPresent = session?.user?.isAdmin;

  if (!isPresent) {
    redirect("/");
  }

  const [posts, projects] = await Promise.all([
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  // Calculated Stats Overview
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = posts.length - publishedPosts;
  const featuredProjects = projects.filter((p) => p.featured).length;

  return (
    <main className='max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-10'>
      {/* Dashboard Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2'>
            <span className='text-red-500'>#</span> Admin Dashboard
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Manage your blog posts, portfolio projects, and administration
            settings.
          </p>
        </div>

        {/* Quick Management Actions */}
        <div className='flex items-center gap-2'>
          <Link
            href='/admin/users'
            className='inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors border border-gray-200 dark:border-gray-700'>
            <svg
              className='w-4 h-4 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
            Manage Admins
          </Link>
          <Link
            href='/admin/subscribers'
            className='inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors border border-gray-200 dark:border-gray-700'>
            <svg
              className='w-4 h-4 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
            Subscribers
          </Link>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <div className='bg-white dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-sm'>
          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
            Total Posts
          </p>
          <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
            {posts.length}
          </p>
        </div>
        <div className='bg-white dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-sm'>
          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
            Published / Drafts
          </p>
          <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
            <span className='text-emerald-500'>{publishedPosts}</span>
            <span className='text-gray-400 font-normal text-lg mx-1'>/</span>
            <span className='text-amber-500'>{draftPosts}</span>
          </p>
        </div>
        <div className='bg-white dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-sm'>
          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
            Total Projects
          </p>
          <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
            {projects.length}
          </p>
        </div>
        <div className='bg-white dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-sm'>
          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
            Featured Projects
          </p>
          <p className='text-2xl font-bold text-red-500 mt-1'>
            {featuredProjects}
          </p>
        </div>
      </div>

      {/* Blog Posts Section */}
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h2 className='font-bold text-gray-900 dark:text-white text-xl'>
              <span className='text-red-500'>#</span> Blog Posts
            </h2>
            <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'>
              {posts.length}
            </span>
          </div>
          <Link
            href='/admin/new'
            className='inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all shadow-sm active:scale-[0.98]'>
            <span>+</span> New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className='text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30'>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              No blog posts found.
            </p>
          </div>
        ) : (
          <div className='grid gap-3'>
            {posts.map((post) => (
              <div
                key={post.id}
                className='group border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-sm'>
                <div className='space-y-1.5 min-w-0'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors truncate'>
                      {post.title}
                    </h3>

                    {/* Status Badges */}
                    {post.published ? (
                      <span className='text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'>
                        Published
                      </span>
                    ) : (
                      <span className='text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'>
                        Draft
                      </span>
                    )}

                    {post.featured && (
                      <span className='text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50'>
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <p className='text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2'>
                    <span>
                      Created{" "}
                      {new Date(post.createdAt).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </span>
                  </p>
                </div>

                <div className='flex items-center gap-2 shrink-0 self-end sm:self-center'>
                  <Link
                    href={`/admin/${post.id}/edit`}
                    className='inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-700'>
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
      </section>

      {/* Projects Section */}
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h2 className='font-bold text-gray-900 dark:text-white text-xl'>
              <span className='text-red-500'>#</span> Projects
            </h2>
            <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'>
              {projects.length}
            </span>
          </div>
          <Link
            href='/admin/projects/new'
            className='inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all shadow-sm active:scale-[0.98]'>
            <span>+</span> New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className='text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30'>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              No projects found.
            </p>
          </div>
        ) : (
          <div className='grid gap-3'>
            {projects.map((project) => (
              <div
                key={project.id}
                className='group border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center gap-4 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-sm'>
                {/* Project Image Thumbnail */}
                <div className='relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shrink-0'>
                  <Image
                    src={project.imageUrl || "/placeholder.png"}
                    alt={project.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-200'
                  />
                </div>

                {/* Project Info */}
                <div className='flex-1 min-w-0 space-y-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors truncate'>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className='text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 shrink-0'>
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className='flex flex-wrap items-center gap-1.5 pt-0.5'>
                    {Array.isArray(project.techStack) &&
                      project.techStack.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className='text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700/80'>
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Action Link */}
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className='inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-700 shrink-0'>
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
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
