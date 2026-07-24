import React from "react";
import Link from "next/link";
import Loading from "./Loading";

type Post = {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
};

const MAX_TITLE_LENGTH = 40;

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

const FeaturedBlogs = ({
  posts,
  postsIsLoading,
}: {
  posts: Post[];
  postsIsLoading: boolean;
}) => {
  return (
    <>
      <h1 className='font-cond font-bold text-gray-800 dark:text-white text-xl md:px-0 pb-2'>
        <span className='text-red-500' id='docs'>
          #
        </span>{" "}
        blogs
      </h1>
      <ul className='mb-4 px-0 lg:flex lg:space-x-2'>
        {postsIsLoading ? (
          <Loading />
        ) : (
          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full'>
            {posts.map((post) => (
              <li
                key={post.id}
                className=' bg-white dark:bg-gray-800 p-3 flex items-center justify-between text-gray-700 dark:text-white w-full'>
                <div className='flex items-start'>
                  <svg
                    className='w-5 h-5 absolute'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'></path>
                  </svg>
                  <Link
                    href={`/posts/${post.slug}`}
                    title={post.title}
                    className='pl-6 hover:underline h-6 overflow-hidden'>
                    {truncateText(post.title, MAX_TITLE_LENGTH)}
                  </Link>
                </div>
                <div className='text-xs'>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ul>
      <Link href='/posts'>
        <button className='text-red-500 hover:text-red-800 text-center w-full focus:outline-none cursor-pointer'>
          --- see more ---
        </button>
      </Link>
    </>
  );
};

export default FeaturedBlogs;
