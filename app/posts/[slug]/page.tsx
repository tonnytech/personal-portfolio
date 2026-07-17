import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import MarkdownRenderer from "../../components/MarkdownRenderer";

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
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
      <p className='text-gray-500 text-sm mb-8'>
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className='prose'>
        <MarkdownRenderer content={post.content} />
      </div>
    </main>
  );
}
