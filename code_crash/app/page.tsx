"use client";

import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "🚀 Booting up Code Crash Terminal Interface...";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center font-mono p-6 relative overflow-hidden">
      {/* Matrix Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#00ff95_1px,transparent_1px)] opacity-10 [background-size:16px_16px] z-0" />

      {/* Main Terminal Card */}
      <div className="relative z-10 max-w-3xl w-full bg-[#0e0e0e] border border-green-600 rounded-lg shadow-lg p-6 md:p-10 text-green-400">
        {/* Terminal Header Buttons */}
        <div className="flex space-x-2 mb-4">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        {/* Typewriter Animation */}
        <div className="text-green-400 text-base md:text-xl mb-4">
          <span className="text-xs text-green-600">[root@code-crash ~]$</span>
          <span className="ml-2">{text}</span>
          {index < fullText.length && <span className="animate-pulse">█</span>}
        </div>

        {/* Welcome Message After Typing */}
        {index === fullText.length && (
          <div className="mt-6 space-y-4">
            <p className="text-green-300 text-sm md:text-lg">
              Welcome to <span className="text-green-400 font-bold">Code Crash</span> — Your personal terminal to solve Java & C++ coding challenges.
            </p>
            <p className="text-green-500 text-xs">Fast. Powerful. Hacker-themed.</p>

            <a
              href="/login"
              className="inline-flex items-center gap-2 bg-green-400 text-black font-semibold px-5 py-2 rounded hover:bg-green-300 transition-all duration-300 shadow hover:scale-105"
            >
              <LogIn className="w-5 h-5" />
              Launch Login
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-green-700 opacity-60 z-10">
        ⌨️ code-crash v1.0.0 — built with logic &  caffeine ☕
      </footer>
    </main>
  );
}
