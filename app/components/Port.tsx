"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./Loading";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string | null;
  repoUrl: string | null;
  techStack: string[];
};

const Portfolio = ({
  projectsIsLoading,
  displayProjects,
  showButton,
}: {
  projectsIsLoading: boolean;
  displayProjects: Project[];
  showButton: boolean;
}) => {
  return (
    <div className='mb-16' id='projects'>
      <h1 className='font-cond font-bold text-gray-800 dark:text-white text-xl px-2 md:px-0 py-4'>
        <span className='text-red-500'>#</span> Portfolio
      </h1>

      {projectsIsLoading ? (
        <Loading />
      ) : displayProjects && displayProjects.length > 0 ? (
        <div className='mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container px-3 lg:px-0'>
          {displayProjects.map((project, i) => (
            <article
              key={project.id || i}
              className='bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden border border-transparent dark:border-gray-700'>
              <div className='p-4 text-gray-600 dark:text-white rounded-md'>
                {/* 1. Restored missing <a> tag */}
                <a
                  href={project.liveUrl || "#"}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block relative w-full h-48 mb-4 overflow-hidden rounded-md group'>
                  <Image
                    src={project?.imageUrl || "/image/default.png"}
                    alt={project.title || `Project ${i + 1}`}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover transition-transform duration-200 group-hover:scale-[1.02]'
                  />
                </a>

                <div className='mb-1 flex justify-between items-center border-b dark:border-gray-700 pb-2'>
                  <h1 className='font-semibold text-lg text-gray-800 dark:text-white truncate pr-2'>
                    {project.title}
                  </h1>

                  <div className='flex gap-3 items-center shrink-0 text-sm'>
                    {/* 2. Restored missing <a> tag */}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-red-700 dark:text-red-300 hover:text-red-800 font-medium'>
                        Code
                      </a>
                    )}
                    {/* 3. Restored missing <a> tag */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:text-red-800  text-gray-100 font-medium'>
                        Live
                      </a>
                    )}
                  </div>
                </div>

                <p className='mt-2 mb-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
                  {project.description}
                </p>

                {project.techStack && project.techStack.length > 0 && (
                  <div className='flex gap-2 flex-wrap'>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className='inline-block bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300 rounded text-xs px-2 py-1'>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className='text-center py-12 text-gray-500 dark:text-gray-400'>
          No projects available in the portfolio yet.
        </div>
      )}

      {/* 4. Swapped raw anchor for Next.js Link */}
      {showButton && (
        <Link href='/projects' className='block w-full'>
          <button className='cursor-pointer text-red-500 dark:text-red-500 text-center w-full focus:outline-none mt-2 hover:text-red-800 transition-colors'>
            --- see more ---
          </button>
        </Link>
      )}
    </div>
  );
};

export default Portfolio;
