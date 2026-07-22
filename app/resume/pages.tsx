"use client";

import React from "react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className='max-w-4xl mx-auto py-10 px-4 sm:px-6 print:py-0 print:px-0 print:max-w-full'>
      {/* Top Navigation & Action Bar (Hidden when printing) */}
      <div className='flex justify-between items-center mb-8 print:hidden'>
        <Link
          href='/'
          className='text-sm font-medium text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors flex items-center gap-1'>
          ← Back to Home
        </Link>
        <button
          onClick={handlePrint}
          className='inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer'>
          <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z'
              clipRule='evenodd'
            />
          </svg>
          Print / Save PDF
        </button>
      </div>

      {/* Resume Card */}
      <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-sm print:border-none print:p-0 print:shadow-none print:bg-transparent print:text-black'>
        {/* Header / Contact Info */}
        <header className='border-b border-gray-200 dark:border-gray-800 pb-8 mb-8 print:border-gray-300'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white print:text-black'>
                Tonny Tei
              </h1>
              <p className='text-lg font-medium text-red-500 mt-1'>
                Full-Stack Software Engineer
              </p>
            </div>

            <div className='text-sm text-gray-600 dark:text-gray-300 space-y-1 print:text-gray-800'>
              <p className='flex items-center gap-2'>
                <span>📍</span> Nairobi, Kenya
              </p>
              <p className='flex items-center gap-2'>
                <span>✉️</span>{" "}
                <a
                  href='mailto:your-email@example.com'
                  className='hover:underline'>
                  your-email@example.com
                </a>
              </p>
              <p className='flex items-center gap-2'>
                <span>🌐</span>{" "}
                <a
                  href='https://github.com/tonnytei'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline'>
                  github.com/tonnytei
                </a>
              </p>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className='mb-8'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 print:text-black'>
            <span className='text-red-500'>#</span> Summary
          </h2>
          <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed print:text-gray-800'>
            Performance-driven Software Engineer specializing in scalable
            full-stack web applications, REST APIs, and cloud deployments.
            Experienced in building modern React/Next.js interfaces, Node.js
            backends, and managing low-latency custom VPS infrastructure.
          </p>
        </section>

        {/* Technical Skills */}
        <section className='mb-8'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 print:text-black'>
            <span className='text-red-500'>#</span> Technical Skills
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
            <div className='bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800 print:border-gray-200'>
              <span className='font-semibold text-gray-900 dark:text-white print:text-black block mb-1'>
                Languages & Core:
              </span>
              <span className='text-gray-600 dark:text-gray-300 print:text-gray-800'>
                TypeScript, JavaScript (ES6+), HTML5, CSS3, SQL
              </span>
            </div>
            <div className='bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800 print:border-gray-200'>
              <span className='font-semibold text-gray-900 dark:text-white print:text-black block mb-1'>
                Frontend:
              </span>
              <span className='text-gray-600 dark:text-gray-300 print:text-gray-800'>
                Next.js (App Router), React, Redux, Tailwind CSS
              </span>
            </div>
            <div className='bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800 print:border-gray-200'>
              <span className='font-semibold text-gray-900 dark:text-white print:text-black block mb-1'>
                Backend & DB:
              </span>
              <span className='text-gray-600 dark:text-gray-300 print:text-gray-800'>
                Node.js, Express, Prisma ORM, MySQL, MongoDB, PostgreSQL
              </span>
            </div>
            <div className='bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800 print:border-gray-200'>
              <span className='font-semibold text-gray-900 dark:text-white print:text-black block mb-1'>
                DevOps & Cloud:
              </span>
              <span className='text-gray-600 dark:text-gray-300 print:text-gray-800'>
                Docker, Cloudflare Tunnels, VPS Management, Git/GitHub
              </span>
            </div>
          </div>
        </section>

        {/* Work Experience (2 Companies) */}
        <section className='mb-8'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 print:text-black'>
            <span className='text-red-500'>#</span> Experience
          </h2>

          <div className='space-y-6'>
            {/* Company 1 */}
            <div className='relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 print:border-gray-300'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-1'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white print:text-black'>
                  Full-Stack Software Engineer{" "}
                  <span className='text-red-500'>@ [First Company Name]</span>
                </h3>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600'>
                  Jan 2024 — Present
                </span>
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400 mb-2 print:text-gray-600'>
                Nairobi, Kenya
              </p>
              <ul className='list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1.5 print:text-gray-800'>
                <li>
                  Engineered custom web applications using Next.js, Node.js, and
                  Prisma ORM.
                </li>
                <li>
                  Optimized server database queries and caching to cut load
                  times by 30%.
                </li>
                <li>
                  Configured Docker container deployments across unmanaged Cloud
                  VPS instances.
                </li>
              </ul>
            </div>

            {/* Company 2 */}
            <div className='relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 print:border-gray-300'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-1'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white print:text-black'>
                  Software Developer{" "}
                  <span className='text-red-500'>@ [Second Company Name]</span>
                </h3>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600'>
                  Jun 2022 — Dec 2023
                </span>
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400 mb-2 print:text-gray-600'>
                Remote / Nairobi
              </p>
              <ul className='list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1.5 print:text-gray-800'>
                <li>
                  Developed responsive, interactive user interfaces using React
                  and Tailwind CSS.
                </li>
                <li>
                  Integrated RESTful APIs and state management routines using
                  Redux Toolkit.
                </li>
                <li>
                  Collaborated with cross-functional teams to deploy weekly
                  feature updates.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education (2 Major Schools) */}
        <section className='mb-8'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 print:text-black'>
            <span className='text-red-500'>#</span> Education
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {/* School 1 */}
            <div className='border border-gray-200 dark:border-gray-800 p-4 rounded-xl print:border-gray-300'>
              <h3 className='font-semibold text-gray-900 dark:text-white print:text-black'>
                B.Sc. in Computer Science / Software Engineering
              </h3>
              <p className='text-xs font-medium text-red-500 mt-0.5'>
                [First Major School Name]
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 print:text-gray-600'>
                2018 — 2022 · Nairobi, Kenya
              </p>
              <p className='text-xs text-gray-600 dark:text-gray-300 mt-2 print:text-gray-800'>
                Focus: Algorithms, Software Architecture, Database Management
                Systems.
              </p>
            </div>

            {/* School 2 */}
            <div className='border border-gray-200 dark:border-gray-800 p-4 rounded-xl print:border-gray-300'>
              <h3 className='font-semibold text-gray-900 dark:text-white print:text-black'>
                Diploma / Advanced Certification
              </h3>
              <p className='text-xs font-medium text-red-500 mt-0.5'>
                [Second Major School Name]
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 print:text-gray-600'>
                2022 — 2023
              </p>
              <p className='text-xs text-gray-600 dark:text-gray-300 mt-2 print:text-gray-800'>
                Focus: Web Application Development, Full-Stack System
                Architecture.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications & Badges */}
        <section>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 print:text-black'>
            <span className='text-red-500'>#</span> Certifications &
            Achievements
          </h2>
          <div className='flex flex-wrap gap-2 text-xs'>
            <span className='px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 print:border-gray-300 print:text-black'>
              Full-Stack Web Development Certification
            </span>
            <span className='px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 print:border-gray-300 print:text-black'>
              VPS & Docker Cloud Infrastructure
            </span>
            <span className='px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 print:border-gray-300 print:text-black'>
              Open Source Contributor
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
