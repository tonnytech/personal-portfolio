import { auth } from "../../../../../auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { updateProject, deleteProject } from "../../actions";
import Image from "next/image";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  const { id } = await params;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold mb-8'>Edit Project</h1>

      <Image
        src={project.imageUrl}
        alt={project.title}
        width={200}
        height={200}
        className='rounded mb-4 object-cover'
      />

      <form action={updateProjectWithId} className='flex flex-col gap-4'>
        <input
          name='title'
          type='text'
          defaultValue={project.title}
          required
          className='border rounded-lg px-3 py-2'
        />
        <textarea
          name='description'
          defaultValue={project.description}
          required
          rows={5}
          className='border rounded-lg px-3 py-2'
        />
        <input
          name='techStack'
          type='text'
          defaultValue={project.techStack.join(", ")}
          placeholder='Tech stack, comma-separated'
          className='border rounded-lg px-3 py-2'
        />
        <input
          name='liveUrl'
          type='url'
          defaultValue={project.liveUrl ?? ""}
          placeholder='Live URL (optional)'
          className='border rounded-lg px-3 py-2'
        />
        <input
          name='repoUrl'
          type='url'
          defaultValue={project.repoUrl ?? ""}
          placeholder='GitHub repo URL (optional)'
          className='border rounded-lg px-3 py-2'
        />
        <div>
          <label className='block text-sm font-medium mb-1'>
            Replace Image (optional)
          </label>
          <input
            name='image'
            type='file'
            accept='image/*'
            className='border rounded-lg px-3 py-2 w-full'
          />
        </div>
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            name='featured'
            defaultChecked={project.featured}
          />
          Featured project
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
          await deleteProject(id);
          redirect("/admin/projects");
        }}
        className='mt-4'>
        <button type='submit' className='text-red-600 text-sm underline'>
          Delete Project
        </button>
      </form>
    </main>
  );
}
