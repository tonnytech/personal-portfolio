"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
// import { redirect } from "next/navigation";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const darkMode = theme === "dark";

  if (!mounted) {
    return (
      <nav className='flex flex-col lg:flex-row lg:justify-between items-center pb-5 pt-4 px-2 md:px-0'>
        <Link href='/' className='font-cond text-4xl whitespace-nowrap'>
          <span className='text-red-500'>ton</span>
          <span className='dark:text-white'>ny</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav className='flex flex-col lg:flex-row lg:justify-between items-center pb-5 pt-4 px-2 md:px-0'>
      {/* Logo Section */}
      <Link href='/' className='font-cond text-4xl whitespace-nowrap'>
        <span className='text-red-500'>ton</span>
        <span className='dark:text-white'>ny</span>
      </Link>

      {/* Navigation Links */}
      <ul className='flex flex-row lg:text-lg items-center space-x-4 lg:space-x-10 py-2 lg:py-0 dark:text-gray-800'>
        <li className='border-b-4 border-red-500 dark:text-white cursor-pointer'>
          <Link href='/posts'>blogs</Link>
        </li>

        <li className='border-b-4 border-red-500 dark:text-white cursor-pointer'>
          {" "}
          <Link href='/resume'>Resume</Link>
        </li>

        <li className='border-b-4 border-red-500 dark:text-white cursor-pointer'>
          <Link href='/projects'>Projects</Link>
        </li>

        {user ? (
          <li className='border-b-4 border-red-500 dark:text-white cursor-pointer'>
            <Link href='/admin'>Dash</Link>
          </li>
        ) : (
          ""
        )}

        {user && (
          <li className='border-b-4 border-red-500 dark:text-white cursor-pointer'>
            <button onClick={() => signOut({ redirectTo: "/" })}>
              sign_out
            </button>
          </li>
        )}

        <li className='cursor-pointer'>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className='cursor-pointer flex items-center'
            aria-label='Toggle Theme'>
            {/* Sun Icon */}
            <svg
              className={`w-6 h-6 text-red-500 ${
                darkMode ? "hidden" : "block"
              }`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                clipRule='evenodd'
              />
            </svg>
            {/* Moon Icon */}
            <svg
              className={`w-6 h-6 text-white ${darkMode ? "block" : "hidden"}`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
