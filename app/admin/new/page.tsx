import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { createPost } from "../actions";
import MarkdownEditorField from "@/app/components/MarkdownEditorField";

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold mb-8'>New Post</h1>

      <form action={createPost} className='flex flex-col gap-4'>
        <input
          name='title'
          type='text'
          placeholder='Post title'
          required
          className='border rounded-lg px-3 py-2'
        />
        {/* <textarea
          name='content'
          placeholder='Write your post content...'
          required
          rows={10}
          className='border rounded-lg px-3 py-2'
        /> */}
        <MarkdownEditorField name='content' />
        <input
          name='tags'
          type='text'
          placeholder='Tags, comma-separated (e.g. nextjs, prisma, tutorial)'
          className='border rounded-lg px-3 py-2'
        />
        <label className='flex items-center gap-2 text-sm'>
          <input type='checkbox' name='published' />
          Publish immediately
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <input type='checkbox' name='featured' />
          Featured post
        </label>
        <button
          type='submit'
          className='bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800'>
          Create Post
        </button>
      </form>
    </main>
  );
}