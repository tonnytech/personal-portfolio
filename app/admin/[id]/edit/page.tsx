import { auth } from "../../../../auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { updatePost, deletePost } from "../../actions";
import MarkdownEditorField from "@/app/components/MarkdownEditorField";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  const { id } = await params;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const updatePostWithId = updatePost.bind(null, id);

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold mb-8'>Edit Post</h1>

      <form action={updatePostWithId} className='flex flex-col gap-4'>
        <input
          name='title'
          type='text'
          defaultValue={post.title}
          required
          className='border rounded-lg px-3 py-2'
        />
        {/* <textarea
          name='content'
          defaultValue={post.content}
          required
          rows={10}
          className='border rounded-lg px-3 py-2'
        /> */}
        <MarkdownEditorField name='content' defaultValue={post.content} />
        <input
          name='tags'
          type='text'
          defaultValue={post.tags.join(", ")}
          placeholder='Tags, comma-separated'
          className='border rounded-lg px-3 py-2'
        />
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            name='published'
            defaultChecked={post.published}
          />
          Published
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            name='featured'
            defaultChecked={post.featured}
          />
          Featured post
        </label>
        <button
          type='submit'
          className='bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800'>
          Save Changes
        </button>
      </form>

      <form
        action={async () => {
          "use server";
          await deletePost(id);
          redirect("/admin");
        }}
        className='mt-4'>
        <button type='submit' className='text-red-600 text-sm underline'>
          Delete Post
        </button>
      </form>
    </main>
  );
}
