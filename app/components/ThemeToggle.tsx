"use client";

import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   if (!mounted) {
//     // Avoid rendering theme-dependent UI until mounted (prevents hydration mismatch)
//     return <div className='w-16 h-8' />;
//   }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className='border rounded px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800'>
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
