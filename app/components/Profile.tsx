import React from "react";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  return (
    <section className='bg-gray-50 dark:bg-gray-800 border-b-2 border-dashed border-gray-400 mb-5 pt-32 sm:pt-36 md:pt-28 lg:pt-24 pb-10 px-4 sm:px-6 md:px-8 transition-colors duration-200'>
      <div className='max-w-4xl mx-auto md:flex md:flex-row-reverse md:items-center md:justify-between gap-8'>
        {/* Image Section */}
        <div className='flex justify-center items-center w-full md:w-1/2'>
          <Image
            src='/images/profile.png' // Mapped straight to public/images/profile.png
            alt='Tonny Tei Profile'
            width={240}
            height={240}
            priority // Eagerly loads image above the fold for LCP
            className='rounded-full h-40 w-40 md:h-48 md:w-48 xl:h-56 xl:w-56 object-cover ring-2 ring-offset-4 md:ring-3 md:ring-offset-8 ring-gray-800 dark:ring-white dark:ring-offset-gray-800'
          />
        </div>

        {/* Text Section */}
        <div className='md:w-1/2 text-left pt-6 md:pt-0'>
          {/* Header & Subtitle */}
          <div className='border-b-4 border-red-500 dark:border-red-500 pb-2 mb-5 text-gray-900 dark:text-white'>
            <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
              Tonny Tei
            </h1>
            <h2 className='text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mt-1'>
              Software Developer
            </h2>
          </div>

          {/* Hero Bio Content */}
          <div className='text-gray-700 dark:text-gray-200 leading-relaxed space-y-4 text-base sm:text-lg'>
            <p>
              Hi, I&apos;m Tonny. I specialize in building fast, reliable, and
              scalable applications using modern tools.
            </p>

            <p>
              Take a look at my{" "}
              <Link
                href='/projects'
                className='border-b-2 border-red-500 font-semibold text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors'>
                projects
              </Link>{" "}
              to see what I&apos;ve built, or dive into my{" "}
              <Link
                href='/resume'
                className='border-b-2 border-red-500 font-semibold text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors'>
                resume
              </Link>{" "}
              for my technical stack and experience.
            </p>

            <p>
              Looking to collaborate, hire, or build something great together?
              Let&apos;s{" "}
              <Link
                href='#contact'
                className='border-b-2 border-red-500 font-semibold text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors'>
                connect and talk
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
