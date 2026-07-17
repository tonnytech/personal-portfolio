import { prisma } from "../../lib/prisma";
import Image from "next/image";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className='max-w-4xl mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-8'>Projects</h1>
      <div className='grid sm:grid-cols-2 gap-6'>
        {projects.map((project) => (
          <div key={project.id} className='border rounded-lg overflow-hidden'>
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={250}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-1'>{project.title}</h2>
              <p className='text-gray-600 text-sm mb-3'>
                {project.description}
              </p>
              <div className='flex flex-wrap gap-2 mb-3'>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className='text-xs bg-gray-100 rounded-full px-2 py-1'>
                    {tech}
                  </span>
                ))}
              </div>
              <div className='flex gap-4 text-sm'>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'>
                    Live Site
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'>
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
