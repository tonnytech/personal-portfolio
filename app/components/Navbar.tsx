import Link from "next/link";
import { auth, signOut } from "../../auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className='border-b px-4 py-3 flex items-center justify-between'>
      <Link href='/' className='font-bold'>
        My Blog
      </Link>

      <div className='flex items-center gap-4 text-sm'>
        <Link href='/posts'>Posts</Link>

        {session?.user ? (
          <>
            <span className='text-gray-500'>
              Signed in as {session.user.email}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
              <button
                type='submit'
                className='border rounded px-3 py-1 hover:bg-gray-50'>
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href='/login'>Sign In</Link>
            <Link href='/signup'>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
