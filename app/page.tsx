import { prisma } from "../lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const [featuredProjects, featuredPosts] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.post.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <main className='max-w-4xl mx-auto py-16 px-4'>
      {/* Hero */}
      <section className='mb-16 text-center'>
        <h1 className='text-4xl font-bold mb-4'>Hi, I&apos;m Tonny</h1>
        <p className='text-gray-600 max-w-xl mx-auto'>
          Full-stack developer building things with Next.js, Prisma, and
          PostgreSQL. Here&apos;s some of my work and writing.
        </p>
      </section>

      {/* Featured Projects */}
      <section className='mb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold'>Featured Projects</h2>
          <Link href='/projects' className='text-sm underline'>
            View all
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <p className='text-gray-500 text-sm'>
            No featured projects yet — mark some as featured in the admin
            dashboard.
          </p>
        ) : (
          <div className='grid sm:grid-cols-3 gap-6'>
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={project.liveUrl || "/projects"}
                target={project.liveUrl ? "_blank" : undefined}
                className='border rounded-lg overflow-hidden hover:shadow-md transition'>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={300}
                  height={180}
                  className='w-full h-32 object-cover'
                />
                <div className='p-3'>
                  <h3 className='font-semibold text-sm'>{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent Posts */}
      <section>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold'>Recent Posts</h2>
          <Link href='/posts' className='text-sm underline'>
            View all
          </Link>
        </div>

        {featuredPosts.length === 0 ? (
          <p className='text-gray-500 text-sm'>No posts published yet.</p>
        ) : (
          <div className='flex flex-col gap-4'>
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className='block border rounded-lg p-4 hover:bg-gray-50 transition'>
                <h3 className='font-semibold'>{post.title}</h3>
                <p className='text-gray-500 text-sm mt-1'>
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
