import NextLink from "next/link";
import { prisma } from "../../lib/prisma";
import BlogHero from "../components/BlogHero";
export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  // Compute tag counts across all published posts
  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const tags = Array.from(tagCounts.entries()).map(([tag, count]) => ({
    tag,
    count,
  }));

  return (
    <main className='max-w-2xl mx-auto py-10 px-4 space-y-6'>
      {/* Redesigned Back Home Button */}
      <div>
        <NextLink
          href='/'
          className='group inline-flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 px-3 py-1.5 rounded-lg bg-gray-100/80 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 hover:border-red-500/30 dark:hover:border-red-500/30 transition-all duration-200 active:scale-95 w-fit'>
          <svg
            className='w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-1'
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

      {/* Header */}
      <div className='border-b border-gray-200 dark:border-gray-800 pb-4'>
        <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2'>
          <span className='text-red-500'>#</span> Blog
        </h1>
      </div>

      <BlogHero initialPosts={posts} tags={tags} />
    </main>
  );
}
