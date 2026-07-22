"use client";

import React, { useState } from "react";
import Link from "next/link";
import Loading from "./Loading";
import SearchNotFound from "./SearchNotFound";
import ErrorComponent from "./ErrorComponent";

type Post = {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
};

type TagCount = {
  tag: string;
  count: number;
};

const BlogHero = ({
  initialPosts,
  tags,
}: {
  initialPosts: Post[];
  tags: TagCount[];
}) => {
  const [displayPosts, setDisplayPosts] = useState<Post[]>(initialPosts);
  const [mySearch, setMySearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const isNextEven = (i: number) => (i + 1) % 2 === 0;

  async function runSearch(params: { q?: string; tag?: string }) {
    setIsLoading(true);
    setHasSearched(true);

    const searchParams = new URLSearchParams(params);
    const res = await fetch(`/api/posts/search?${searchParams.toString()}`);
    const results: Post[] = await res.json();

    setDisplayPosts(results);
    setIsLoading(false);

    if (!results.length) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = mySearch.trim();
    if (trimmed) {
      runSearch({ q: trimmed });
    } else {
      setMySearch("");
    }
  }

  function handleTagClick(tag: string) {
    runSearch({ tag });
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        {showError && (
          <div className='flex items-center justify-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 text-red-700'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85l.007-.15V6c0-1.054-.816-1.918-1.85-1.995L18.937 4H6.062c-1.054 0-1.918.816-1.995 1.85L4 6v12c0 1.054.816 1.918 1.85 1.995l.15.007z'
              />
            </svg>
            <h1 className='text-red-700 font-bold'>Sorry, search not found</h1>
          </div>
        )}
      </div>

      <form onSubmit={handleSearch}>
        <div className='flex justify-center items-center mt-7'>
          <input
            type='text'
            name='query'
            value={mySearch}
            onChange={(e) => setMySearch(e.target.value)}
            placeholder='search documentation...'
            className='absolute rounded-lg py-1 px-5 w-80 md:w-96 ring-4 ring-gray-300 ring-opacity-50 dark:ring-gray-700 dark:bg-gray-600 dark:text-white focus:outline-none'
          />
          <button
            type='submit'
            className='relative left-32 md:left-40 pl-0 text-gray-300 dark:text-gray-400 focus:outline-none'>
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
      </form>

      <div className='mt-16'>
        {isLoading ? (
          <Loading />
        ) : displayPosts && displayPosts.length ? (
          <ul className='pb-4 px-0 lg:flex lg:space-x-2'>
            <li className='flex flex-col w-full'>
              {displayPosts.map((post, i) => (
                <div
                  key={post.id}
                  className={`${
                    isNextEven(i + 1)
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } p-3 flex items-center justify-between text-gray-700 dark:text-white`}>
                  <div className='flex items-start'>
                    <svg
                      className='w-5 h-5'
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
                      className='pl-6 hover:underline h-6 overflow-hidden'>
                      {post.title}
                    </Link>
                  </div>
                  <div className='text-xs'>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        ) : hasSearched ? (
          <SearchNotFound />
        ) : (
          <ErrorComponent />
        )}
      </div>

      <div className='pb-4 px-2 md:px-0'>
        <h1 className='font-cond font-bold text-gray-800 dark:text-white text-xl py-2'>
          {" "}
          <span className='text-red-500'>#</span> tags
        </h1>
        <div className='flex flex-wrap gap-2 px-2'>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className='cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md px-3 py-1.5 text-sm hover:border-red-500 border border-transparent transition-colors'>
              {tag} (<span className='text-red-500'>{count}</span>)
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogHero;
