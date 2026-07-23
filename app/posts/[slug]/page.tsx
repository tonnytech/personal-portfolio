import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import MarkdownRenderer from "../../components/MarkdownRenderer";
export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className='max-w-2xl mx-auto py-10 px-4 space-y-6'>
      {/* Back Home Button */}
      <div>
        <NextLink
          href='/posts'
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
          <span>Back to Blogs</span>
        </NextLink>
      </div>

      {/* Post Header */}
      <div className='border-b border-gray-200 dark:border-gray-800 pb-6 space-y-2'>
        <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
          {post.title}
        </h1>
        <p className='text-gray-500 dark:text-gray-400 text-sm'>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Article Body */}
      <div className='prose dark:prose-invert max-w-none'>
        <MarkdownRenderer content={post.content} />
      </div>
    </main>
  );
}
