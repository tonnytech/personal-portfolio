import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export default async function SubscribersPage() {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/login");

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='font-cond font-bold text-gray-800 dark:text-white text-2xl mb-2'>
        <span className='text-red-500'>#</span> subscribers
      </h1>
      <p className='text-sm text-gray-500 dark:text-gray-400 mb-8'>
        {subscribers.length} total subscriber
        {subscribers.length !== 1 ? "s" : ""}
      </p>

      {subscribers.length === 0 ? (
        <p className='text-gray-500 dark:text-gray-400 text-sm'>
          No subscribers yet.
        </p>
      ) : (
        <div className='flex flex-col gap-2'>
          {subscribers.map((sub) => (
            <div
              key={sub.id}
              className='border dark:border-gray-700 rounded-lg p-3 flex items-center justify-between bg-white dark:bg-gray-800'>
              <span className='text-sm dark:text-white'>{sub.email}</span>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {new Date(sub.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
