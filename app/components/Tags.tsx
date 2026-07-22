import React from "react";

interface TagsProps {
  tags?: string[];
}

const defaultStack = [
  "Node.js",
  "Tailwind",
  "MongoDB",
  "SQL",
  "Express.js",
  "React.js",
  "TypeScript",
  "Firebase",
  "JavaScript",
  "Ruby",
  "Rails",
  "GitHub",
  "Docker",
  "Next.js",
  "MySQL",
  "CSS",
];

export default function Tags({ tags = defaultStack }: TagsProps) {
  return (
    <div className='mb-4 px-2 md:px-0'>
      <h1 className='font-cond font-bold text-gray-800 dark:text-white text-xl py-2'>
        <span className='text-red-500'>#</span> stack
      </h1>

      <div className='grid grid-cols-3 md:grid-cols-6 justify-start items-center text-gray-600 dark:text-gray-300 px-2'>
        {tags.map((tag, index) => (
          <div
            key={`${tag}-${index}`}
            className='cursor-default bg-gray-100 dark:bg-gray-800 text-center p-1 border-4 border-white dark:border-gray-900 truncate text-sm'>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
