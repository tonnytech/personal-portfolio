import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-8'>Blog</h1>
      <div className='flex flex-col gap-6'>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className='block border rounded-lg p-4 hover:bg-gray-50 transition'>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p className='text-gray-500 text-sm mt-1'>
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
