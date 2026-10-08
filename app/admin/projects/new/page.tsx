import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { createProject } from "../actions";

export default async function NewProjectPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold mb-8'>New Project</h1>

      <form
        action={createProject}
        encType='multipart/form-data'
        className='flex flex-col gap-4'>
        <input
          name='title'
          type='text'
          placeholder='Project title'
          required
          className='border rounded-lg px-3 py-2'
        />
        <textarea
          name='description'
          placeholder='Short description of the project...'
          required
          rows={5}
          className='border rounded-lg px-3 py-2'
        />
        <input
          name='techStack'
          type='text'
          placeholder='Tech stack, comma-separated (e.g. Next.js, Prisma, PostgreSQL)'
          className='border rounded-lg px-3 py-2'
        />
        <input
          name='liveUrl'
          type='url'
          placeholder='Live URL (optional)'
          className='border rounded-lg px-3 py-2'
        />
        <input
          name='repoUrl'
          type='url'
          placeholder='GitHub repo URL (optional)'
          className='border rounded-lg px-3 py-2'
        />
        <div>
          <label className='block text-sm font-medium mb-1'>
            Project Image
          </label>
          <input
            name='image'
            type='file'
            accept='image/*'
            required
            className='border rounded-lg px-3 py-2 w-full'
          />
        </div>
        <label className='flex items-center gap-2 text-sm'>
          <input type='checkbox' name='featured' />
          Featured project
        </label>
        <button
          type='submit'
          className='bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800'>
          Create Project
        </button>
      </form>
    </main>
  );
}
