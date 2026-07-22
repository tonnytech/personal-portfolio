import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { toggleAdmin } from "./actions";

export default async function ManageAdminsPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/login");

  const users = await prisma.user.findMany({
    orderBy: { email: "asc" },
  });

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='font-cond font-bold text-gray-800 dark:text-white text-2xl mb-8'>
        <span className='text-red-500'>#</span> manage_admins
      </h1>

      <div className='flex flex-col gap-3'>
        {users.map((user) => (
          <div
            key={user.id}
            className='border dark:border-gray-700 rounded-lg p-4 flex items-center justify-between bg-white dark:bg-gray-800'>
            <div>
              <p className='font-medium dark:text-white'>
                {user.name || "Unnamed"}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {user.email}
              </p>
            </div>

            <form
              action={async () => {
                "use server";
                await toggleAdmin(user.id, !user.isAdmin);
              }}>
              <button
                type='submit'
                disabled={user.id === session.user.id && user.isAdmin}
                className={`text-sm px-3 py-1.5 rounded-lg font-medium ${
                  user.isAdmin
                    ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                } disabled:opacity-50 disabled:cursor-not-allowed`}>
                {user.isAdmin ? "Remove Admin" : "Make Admin"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
