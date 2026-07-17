"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/login");
  }

  return (
    <main className='max-w-sm mx-auto py-16 px-4'>
      <h1 className='text-2xl font-bold mb-8 text-center'>Sign Up</h1>

      {error && (
        <p className='text-red-600 text-sm mb-4 text-center'>{error}</p>
      )}

      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          name='name'
          type='text'
          placeholder='Name'
          className='border rounded-lg px-3 py-2'
        />
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
          Create Account
        </button>
      </form>
    </main>
  );
}
