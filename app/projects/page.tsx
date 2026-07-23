import { prisma } from "../../lib/prisma";
import Image from "next/image";
import NextLink from "next/link";
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // Sort featured projects first, then by creation date
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className='min-h-screen py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Top Navigation / Breadcrumb */}
        <div>
          <NextLink
            href='/'
            className='inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors py-1.5 px-3 rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 w-fit'>
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
            <span>Back to Home</span>
          </NextLink>
        </div>

        {/* Header Section */}
        <div className='border-b border-gray-200 dark:border-gray-800 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
          <div className='space-y-3 max-w-2xl'>
            <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl flex items-center gap-3'>
              <span className='text-red-500'>#</span> Projects
            </h1>
            <p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed'>
              A curated collection of full-stack applications, developer tools,
              and side projects I&apos;ve engineered.
            </p>
          </div>

          {/* Dynamic Project Counter */}
          <div className='shrink-0'>
            <span className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/80 shadow-xs'>
              <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse' />
              {projects.length} {projects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>
        </div>

        {/* Projects Grid / Empty State */}
        {projects.length === 0 ? (
          <div className='text-center py-20 border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30 space-y-4'>
            <div className='inline-flex p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-8 ring-gray-50 dark:ring-gray-900/50'>
              <svg
                className='w-7 h-7'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                />
              </svg>
            </div>
            <div className='space-y-1'>
              <h3 className='font-semibold text-gray-900 dark:text-white text-base'>
                No projects found
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto'>
                There are no showcase projects published right now. Check back
                soon!
              </p>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {projects.map((project) => (
              <article
                key={project.id}
                className='group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 overflow-hidden hover:border-gray-300 dark:hover:border-gray-700/80 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1'>
                {/* Image Container with Zoom Effect */}
                <div className='relative h-60 w-full overflow-hidden bg-gray-100 dark:bg-gray-800'>
                  <Image
                    src={project.imageUrl || "/placeholder.png"}
                    alt={project.title}
                    fill
                    sizes='(max-width: 768px) 100vw, 50vw'
                    className='object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
                  />

                  {/* Gradient Hover Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                  {/* Featured Floating Pill */}
                  {project.featured && (
                    <div className='absolute top-3 left-3 z-10'>
                      <span className='inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-red-500/90 text-white backdrop-blur-md shadow-md border border-red-400/30 tracking-wide'>
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className='flex flex-col flex-1 p-6 space-y-4'>
                  <div className='space-y-2 flex-1'>
                    <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200'>
                      {project.title}
                    </h2>

                    <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3'>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className='flex flex-wrap gap-1.5 pt-2'>
                    {Array.isArray(project.techStack) &&
                      project.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className='inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700/60'>
                          {tech}
                        </span>
                      ))}
                  </div>

                  {/* Action Buttons */}
                  <div className='pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 hover:bg-red-600 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-red-500 dark:hover:text-white text-xs font-semibold transition-all shadow-sm active:scale-95'>
                          <span>Live Demo</span>
                          <svg
                            className='w-3.5 h-3.5 stroke-[2.25]'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                            />
                          </svg>
                        </a>
                      )}

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors border border-gray-200 dark:border-gray-700 active:scale-95'>
                          <svg
                            className='w-3.5 h-3.5 fill-current'
                            viewBox='0 0 24 24'>
                            <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                          </svg>
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
