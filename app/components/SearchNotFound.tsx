import React from "react";

const SearchNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-12 w-12 text-gray-500 dark:text-gray-400 mb-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM9.172 16.828A8.003 8.003 0 0112 4a8.003 8.003 0 012.828 12.828l1.415 1.414C16.367 18.776 17 19.87 17 21a1 1 0 01-2 0c0-.87-.634-1.964-1.172-2.586l-1.415-1.414a8.003 8.003 0 01-6.828 0l-1.415 1.414C6.634 19.036 6 20.13 6 21a1 1 0 01-2 0c0-1.13.633-2.224 1.172-2.586l1.415-1.414A8.003 8.003 0 0112 4c.831 0 1.636.162 2.414.414l-1.414 1.414a5.995 5.995 0 00-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6c-.513 0-1.01.074-1.486.21l-1.415-1.415C10.69 5.128 11.337 5 12 5c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3z'
        />
      </svg>
      <h1 className='text-xl font-medium'>Search not found</h1>
    </div>
  );
};

export default SearchNotFound;
