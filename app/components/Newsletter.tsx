"use client";

import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCaptchaClick = () => {
    if (isVerified) {
      setIsVerified(false);
      return;
    }

    if (isVerifying) return;

    setIsVerifying(true);
    if (status === "error") setStatus("idle");

    // Simulate human-behavior verification check (~850ms delay)
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 850);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isVerified) {
      setErrorMessage("Please verify that you are not a robot.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isHuman: isVerified }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setIsVerified(false);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className='mb-16 px-2 md:px-0'>
      <h1 className='font-cond font-bold text-gray-800 dark:text-white text-xl pb-2'>
        <span className='text-red-500'>#</span> stay_updated
      </h1>

      <div className='bg-gray-100 dark:bg-gray-800 rounded-md p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
        <div>
          <p className='text-gray-700 dark:text-white font-semibold mb-1'>
            Get new posts straight to your inbox
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-300'>
            No spam, unsubscribe anytime.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-3 w-full lg:w-auto'>
          <div className='flex flex-col sm:flex-row gap-2 w-full'>
            <input
              type='email'
              required
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-red-500'
            />
            <button
              type='submit'
              disabled={status === "loading" || !isVerified}
              className='bg-red-500 hover:bg-red-600 text-white rounded px-5 py-2 text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs'>
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {/* Interactive CAPTCHA Widget */}
          <div
            onClick={handleCaptchaClick}
            className={`flex items-center justify-between gap-4 px-3.5 py-2.5 bg-white dark:bg-gray-900 border rounded-md text-xs select-none cursor-pointer transition-all duration-200 w-full sm:w-auto ${
              isVerified
                ? "border-green-500/50 dark:border-green-500/50 bg-green-50/20 dark:bg-green-950/10"
                : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
            }`}>
            <div className='flex items-center gap-3'>
              {/* Checkbox Icon / Spinner */}
              <div className='relative flex items-center justify-center w-5 h-5 shrink-0'>
                {isVerifying ? (
                  /* Spinner state */
                  <div className='w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin' />
                ) : isVerified ? (
                  /* Verified Green Check */
                  <div className='w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white shadow-xs animate-in zoom-in-50 duration-200'>
                    <svg
                      className='w-3.5 h-3.5 stroke-[3]'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                ) : (
                  /* Idle Checkbox */
                  <div className='w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 hover:border-red-500 transition-colors' />
                )}
              </div>

              <span className='text-gray-700 dark:text-gray-200 font-medium text-xs sm:text-sm'>
                I&apos;m not a robot
              </span>
            </div>

            {/* CAPTCHA Shield Badge */}
            <div className='flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity pl-2'>
              <svg
                className={`w-4 h-4 ${isVerified ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.75'
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                />
              </svg>
              <span className='text-[8px] text-gray-400 font-sans tracking-tight leading-none mt-0.5'>
                CAPTCHA
              </span>
            </div>
          </div>
        </form>
      </div>

      {status === "success" && (
        <p className='text-sm text-green-600 dark:text-green-400 mt-2'>
          Thanks for subscribing!
        </p>
      )}
      {status === "error" && (
        <p className='text-sm text-red-600 dark:text-red-400 mt-2'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Newsletter;
