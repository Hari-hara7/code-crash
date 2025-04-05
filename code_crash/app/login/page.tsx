"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center font-mono p-6 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#00ff95_1px,transparent_1px)] opacity-10 [background-size:16px_16px] z-0" />

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full bg-[#0e0e0e] border border-green-600 rounded-lg shadow-xl p-8 text-green-300">
        <div className="flex space-x-2 mb-4">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center tracking-wide">
          Student Terminal Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>
        )}

        {/* Email Input */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" size={18} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 p-2 rounded bg-[#1a1a1a] border border-green-500 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" size={18} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 p-2 rounded bg-[#1a1a1a] border border-green-500 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 bg-green-400 text-black font-semibold px-4 py-2 rounded hover:bg-green-300 transition-all duration-300 shadow hover:scale-105"
        >
          <LogIn className="w-5 h-5" />
          Login to Terminal
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-green-700 opacity-60 z-10">
        👨‍💻 Login securely to Code Crash System
      </footer>
    </main>
  );
}
