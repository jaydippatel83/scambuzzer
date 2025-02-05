"use client"; 
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); 

  useEffect(() => { 
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full dark:bg-black border transition-colors  dark:border-green-700 hover:bg-green-400/10 "
      aria-label="Toggle theme"
    >
      {isDark ? <SunIcon className=" text-green-400 w-6 h-6   "   /> : <MoonIcon className="text-green-400 w-6 h-6  "  />}
    </button>
  );
};

export default ThemeToggle;
