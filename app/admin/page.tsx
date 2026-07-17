import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
        <Link
          href='/admin/new'
          className='bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800'>
          + New Post
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='border rounded-lg p-4 flex items-center justify-between'>
            <div>
              <h2 className='font-semibold'>{post.title}</h2>
              <p className='text-sm text-gray-500'>
                {post.published ? "Published" : "Draft"} ·{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='flex gap-3 text-sm'>
              <Link href={`/admin/${post.id}/edit`} className='underline'>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
