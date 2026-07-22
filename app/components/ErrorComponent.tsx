import React from "react";

const ErrorComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-16 w-16 text-red-500 mb-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z'
        />
      </svg>
      <h1 className='text-2xl font-semibold'>Oops! An error occurred</h1>
      <p className='mt-2 text-gray-500 dark:text-gray-400'>
        Kindly reload the page and try again.
      </p>
    </div>
  );
};

export default ErrorComponent;
