"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, ChevronRightCircle } from "lucide-react";
import Link from "next/link"; // ✅ Import Link

export default function DashboardPage() {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/question-list")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#0d0d0d] text-green-400 font-mono p-6 relative overflow-hidden">

      {/* ✨ Matrix Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#00ff95_1px,transparent_1px)] opacity-[0.08] [background-size:16px_16px] z-0 pointer-events-none" />

      {/* 🔥 Header */}
      <section className="relative z-10 mb-12 text-center">
        <div className="flex justify-center items-center gap-3 text-green-300 animate-pulse">
          <Terminal size={26} className="text-green-400" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">Code Portal</h1>
        </div>
        <p className="mt-2 text-green-600 text-sm">Unleash your code. Pick a question. Conquer.</p>
      </section>

      {/* 📜 Question Cards */}
      <section className="relative z-10 max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((q: any) => (
          <div
            key={q.id}
            onClick={() => router.push(`/question/${q.id}`)}
            className="bg-[#121212] border border-green-700 hover:border-green-400 hover:shadow-[0_0_20px_#00ff95] rounded-lg p-5 cursor-pointer transition-all group hover:scale-105 duration-200 ease-in-out"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-green-300 group-hover:text-green-100">
                  {q.title}
                </h2>
                <p className="text-xs text-green-500 uppercase mt-1">{q.language}</p>
              </div>
              <ChevronRightCircle
                size={28}
                className="text-green-400 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        ))}
      </section>

      {/* 🧠 Footer */}
      <footer className="relative z-10 mt-20 px-4 py-8 text-center text-sm text-green-500 bg-black border-t border-green-900">
  <div className="space-y-2">
    <div className="flex justify-center gap-4 text-green-400">
      <Link href="/feedback" className="hover:text-green-200 underline transition duration-150 ease-in-out">
        💬 Give Feedback
      </Link>
      <Link href="/support" className="font-medium hover:underline transition duration-150 ease-in-out">
        Support
      </Link>
      <Link href="/suggest" className="hover:underline text-sm">Suggest a Feature</Link>
      <Link href="/tips" className="hover:underline">Tips & Tricks</Link>

    </div>
    <p className="text-xs text-green-600 opacity-70">
      © 2025 <span className="font-semibold text-green-400">Code Crash</span> 🚀 — Built for coders who love the terminal.
    </p>
  </div>
</footer>
    </main>
  );
}
