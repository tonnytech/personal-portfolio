"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDFDocument } from "../components/ResumePDF";

// Array of 7 certificates earned from the most recent school
const certificates = [
  {
    title: "HTML/CSS",
    url: "https://www.credential.net/d70a2b84-fc78-44fc-9892-962e110192dc#acc.POtQo43M",
  },
  {
    title: "JavaScript",
    url: "https://www.credential.net/817e792c-02ae-4f30-ab6f-f3051a46e5bc#acc.rFlxCQfc",
  },
  {
    title: "Microverse React & Redux Module ",
    url: "https://www.credential.net/91893fac-6d34-4dd2-b7a6-2867c570d5b9#acc.jVgxw9mW",
  },
  {
    title: "Microverse Ruby/Databases Module",
    url: "https://www.credential.net/b3b31bec-0e28-4cdd-b790-9bf35d9d6fe2#acc.zdmDnPpZ",
  },
  {
    title: "Microverse Ruby on Rails Module",
    url: "https://www.credential.net/16124970-9305-4a1b-9a43-2d81970ab27e#acc.XBa2msRn",
  },
  {
    title: "Microverse Software Development Program",
    url: "https://www.credential.net/b7a1f414-4938-43f0-a594-c11bff34e769#acc.MfdZhPbu",
  },
  {
    title: "Responsive Web Design",
    url: "https://www.freecodecamp.org/certification/Tei/responsive-web-design",
  },
];

export default function ResumePage() {

    const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  return (
    <main className='max-w-4xl mx-auto py-10 px-4 sm:px-6 print:py-0 print:px-0 print:max-w-full'>
      {/* Top Navigation & Action Bar */}
      <div className='flex justify-between items-center mb-8 print:hidden'>
        <Link
          href='/'
          className='text-sm font-medium text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors flex items-center gap-1'>
          ← Back to Home
        </Link>
        {isClient && (
          <PDFDownloadLink
            document={<ResumePDFDocument />}
            fileName='Tonny_Tei_Resume.pdf'
            className='inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer'>
            {({ loading }) => (
              <>
                <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                  <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
                </svg>
                <span>
                  {loading ? "Generating PDF..." : "Download PDF"}
                </span>
              </>
            )}
          </PDFDownloadLink>
        )}
      </div>

      {/* Resume Container */}
      <div className='id="resume-content" bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-sm print:border-none print:p-0 print:shadow-none print:bg-transparent print:text-black'>
        {/* Header */}
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
              <p className='flex items-center gap-2'>📍 Nairobi, Kenya</p>
              <p className='flex items-center gap-2'>
                ✉️{" "}
                <a
                  href='mailto:your-email@example.com'
                  className='hover:underline'>
                  tonnytei4@gmail.com
                </a>
              </p>
              <p className='flex items-center gap-2'>
                🌐{" "}
                <a
                  href='https://github.com/tonnytei'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline'>
                  github.com/tonnytech
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
            full-stack web applications, mobile applications, REST APIs, and
            cloud deployments. Experienced in building modern softwares and
            managing low-latency custom VPS infrastructure.
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
                Node.js, Express, Prisma ORM, MySQL, MongoDB, PostgreSQL, Ruby,
                Ruby on Rails
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

        {/* Work Experience */}
        <section className='mb-8'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 print:text-black'>
            <span className='text-red-500'>#</span> Experience
          </h2>

          <div className='space-y-6'>
            {/* Company 1 */}
            <div className='relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 print:border-gray-300'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-1'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white print:text-black'>
                  Part time web developer{" "}
                  <span className='text-red-500'>@ [Shiftech Africa]</span>
                </h3>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600'>
                  Sep 2024 — Present
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
                  <span className='text-red-500'>@ [Freelance developer]</span>
                </h3>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600'>
                  Jan 2024 — Present
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
                  Ensured website security of client&apos;s website and kept
                  confidential information from leaking
                </li>
              </ul>
            </div>
            {/* company 3 */}
            <div className='relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 print:border-gray-300'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-1'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white print:text-black'>
                  Mentoring Developers{" "}
                  <span className='text-red-500'>@ [Microverse]</span>
                </h3>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600'>
                  Jun 2023 — Dec 2023
                </span>
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400 mb-2 print:text-gray-600'>
                Remote / San Francisco (U.S.A)
              </p>
              <ul className='list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1.5 print:text-gray-800'>
                <li>
                  Mentored junior developers, providing technical support
                  through code reviews
                </li>
                <li>
                  Advised junior developers on soft skills that would help them
                  stay in the program for the period required, nine months.
                </li>
                <li>
                  Proposed improvements to code organization to improve code
                  quality and overall performance.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education & Training */}
        <section className='mb-8'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 print:text-black'>
            <span className='text-red-500'>#</span> Education & Training
          </h2>

          <div className='space-y-6'>
            {/* Most Recent School (With 7 Certificates) */}
            <div className='border border-gray-200 dark:border-gray-800 p-5 rounded-xl print:border-gray-300'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-2'>
                <div>
                  <h3 className='font-semibold text-lg text-gray-900 dark:text-white print:text-black'>
                    Fullstack Website development
                  </h3>
                  <p className='text-sm font-medium text-red-500 mt-0.5'>
                    [Microverse]
                  </p>
                </div>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600 mt-1 sm:mt-0'>
                  2022 — 2023 · San Francisco, California, United States
                  (Remote)
                </span>
              </div>

              <p className='text-xs text-gray-600 dark:text-gray-300 mb-4 print:text-gray-800'>
                Spent 1300+ hours mastering algorithms, data structures, and
                full-stack development and earned certificates in HTML and CSS,
                JavaScript, React and Redux, Ruby, Ruby on Rails, and full-stack
                development.
              </p>

              {/* Certificate Grid */}
              <div className='border-t border-gray-100 dark:border-gray-800 pt-3 mt-3 print:border-gray-200'>
                <h4 className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 print:text-gray-900 flex items-center justify-between'>
                  <span>
                    Verified Program Certificates ({certificates.length})
                  </span>
                  <span className='text-[10px] text-gray-400 font-normal print:hidden'>
                    Click to view credential
                  </span>
                </h4>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs'>
                  {certificates.map((cert, index) => (
                    <a
                      key={index}
                      href={cert.url}
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 hover:bg-red-50/50 dark:hover:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-all duration-150 group print:border-gray-300 print:text-black print:bg-transparent'>
                      <span className='truncate font-medium flex items-center gap-1.5'>
                        <span className='text-red-500 font-bold text-[10px]'>
                          0{index + 1}.
                        </span>
                        {cert.title}
                      </span>
                      <svg
                        className='w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 opacity-60 group-hover:opacity-100 flex-shrink-0 ml-2 transition-opacity print:hidden'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* School 2 (First School) */}
            <div className='border border-gray-200 dark:border-gray-800 p-5 rounded-xl print:border-gray-300'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-2'>
                <div>
                  <h3 className='font-semibold text-lg text-gray-900 dark:text-white print:text-black'>
                    B.Sc. in Computer Science
                  </h3>
                  <p className='text-sm font-medium text-red-500 mt-0.5'>
                    [Murang&apos;a University of Technology]
                  </p>
                </div>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium print:text-gray-600 mt-1 sm:mt-0'>
                  2017 — 2023 · Murang&apos;a, Kenya
                </span>
              </div>
              <div className='mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80 print:border-gray-200'>
                {/* Overview Statement */}
                <p className='text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3 print:text-gray-800'>
                  Completed a comprehensive, four-year curriculum focused on
                  fundamental computer science theory, systems engineering, and
                  scalable software architecture. Applied core engineering
                  principles through hands-on lab work, algorithm optimization,
                  and full-stack capstone projects.
                </p>

                {/* 2x2 Discipline Breakdown */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3'>
                  <div className='p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 print:bg-transparent print:border-gray-200'>
                    <span className='font-semibold text-gray-900 dark:text-white print:text-black flex items-center gap-1.5 mb-1'>
                      <span className='text-red-500 font-bold'>#</span>{" "}
                      Algorithms & Theory
                    </span>
                    <p className='text-[11px] text-gray-500 dark:text-gray-400 print:text-gray-700 leading-snug'>
                      Data structures, asymptotic complexity analysis ($O(n)$,
                      $O(\log n)$), graph theory, and dynamic programming.
                    </p>
                  </div>

                  <div className='p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 print:bg-transparent print:border-gray-200'>
                    <span className='font-semibold text-gray-900 dark:text-white print:text-black flex items-center gap-1.5 mb-1'>
                      <span className='text-red-500 font-bold'>#</span> Software
                      Architecture
                    </span>
                    <p className='text-[11px] text-gray-500 dark:text-gray-400 print:text-gray-700 leading-snug'>
                      Object-Oriented Programming (OOP), design patterns,
                      SDLC/Agile practices, and Git version control workflows.
                    </p>
                  </div>

                  <div className='p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 print:bg-transparent print:border-gray-200'>
                    <span className='font-semibold text-gray-900 dark:text-white print:text-black flex items-center gap-1.5 mb-1'>
                      <span className='text-red-500 font-bold'>#</span> Systems
                      & Networking
                    </span>
                    <p className='text-[11px] text-gray-500 dark:text-gray-400 print:text-gray-700 leading-snug'>
                      Operating system kernel processes, multithreading, memory
                      allocation, TCP/IP stack, and socket interfaces.
                    </p>
                  </div>

                  <div className='p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 print:bg-transparent print:border-gray-200'>
                    <span className='font-semibold text-gray-900 dark:text-white print:text-black flex items-center gap-1.5 mb-1'>
                      <span className='text-red-500 font-bold'>#</span>{" "}
                      Databases & Web Systems
                    </span>
                    <p className='text-[11px] text-gray-500 dark:text-gray-400 print:text-gray-700 leading-snug'>
                      Relational database design (SQL), normalization (3NF),
                      indexing, REST APIs, and client-server architectures.
                    </p>
                  </div>
                </div>

                {/* Key Coursework Tags */}
                <div className='flex flex-wrap items-center gap-1.5'>
                  <span className='text-[11px] font-medium text-gray-500 dark:text-gray-400 print:text-gray-600 mr-1'>
                    Modules:
                  </span>
                  {[
                    "Discrete Mathematics",
                    "Information Security",
                    "Software Testing & QA",
                    "Distributed Systems",
                    "Compiler Design",
                  ].map((module, i) => (
                    <span
                      key={i}
                      className='text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 print:border-gray-300 print:text-black font-medium'>
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
