import { signIn } from "../../auth";

export default function LoginPage() {
  return (
    <main className='max-w-sm mx-auto py-16 px-4'>
      <h1 className='text-2xl font-bold mb-8 text-center'>Sign In</h1>

      {/* OAuth buttons */}
      <div className='flex flex-col gap-3 mb-8'>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/posts" });
          }}>
          <button
            type='submit'
            className='w-full border rounded-lg py-2 font-medium hover:bg-gray-50'>
            Continue with GitHub
          </button>
        </form>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/posts" });
          }}>
          <button
            type='submit'
            className='w-full border rounded-lg py-2 font-medium hover:bg-gray-50'>
            Continue with Google
          </button>
        </form>
      </div>

      <div className='text-center text-gray-400 text-sm mb-6'>or</div>

      {/* Email/password form */}
      <form
        action={async (formData: FormData) => {
          "use server";
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          await signIn("credentials", {
            email,
            password,
            redirectTo: "/posts",
          });
        }}
        className='flex flex-col gap-3'>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          className='border rounded-lg px-3 py-2'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          className='border rounded-lg px-3 py-2'
        />
        <button
          type='submit'
          className='bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800'>
          Sign In
        </button>
      </form>
    </main>
  );
}
