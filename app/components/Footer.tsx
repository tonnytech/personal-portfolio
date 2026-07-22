"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();
  const user = session?.user;
   const [mounted, setMounted] = useState(false);

    useEffect(() => {
       // eslint-disable-next-line react-hooks/set-state-in-effect
       setMounted(true);
     }, []);

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
    <div className='pb-16 px-4 md:px-0' id='contact'>
      <div className='flex justify-between items-start'>
        <div className='border-l-4 border-red-500 pl-6 dark:text-gray-200 py-2 text-sm'>
          {/* Note: Standard <a> tags are correct here since these are all external links */}
          <a
            className='block mb-2 hover:underline'
            href='https://github.com/tonnytech'
            target='_blank'
            rel='noreferrer'>
            github.com/tonnytech
          </a>
          <a
            className='block mb-2 hover:underline'
            href='https://linkedin.com/in/tonnytei'
            target='_blank'
            rel='noreferrer'>
            linkedin.com/in/tonnytei
          </a>
          <a
            className='block hover:underline'
            href='mailto:tonnytei4@gmail.com'
            target='_blank'
            rel='noreferrer'>
            tonnytei4@gmail.com
          </a>
        </div>

        {user ? (
          <button className='text-red-500 hover:underline'>in</button>
        ) : (
          <button className='text-red-500 hover:underline'>
            <Link href='/login'>isAdmin</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Footer;
