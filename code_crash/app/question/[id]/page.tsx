"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Loader2, Clock10, Code2, CheckCircle } from "lucide-react";

export default function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserEmail(user.email || "unknown@user.com");

    fetch(`/api/question/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setLoading(false);
        startTimer();
      });
  }, [id]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          if (!submitted) handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (isAuto = false) => {
    if (submitted) return;
    setSubmitted(true);
    clearInterval(intervalRef.current!);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const res = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({
        questionId: id,
        userId: user.id,
        userCode: code,
      }),
    });

    const { isCorrect } = await res.json();
    const result = isAuto
      ? `⏰ Auto-submitted due to timeout.`
      : "✅ Submitted manually.";
    const status = isCorrect ? "✅ Correct" : "❌ Incorrect";

    setResultMessage(`${result} ${status}`);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <Loader2 className="animate-spin" size={36} />
          <span className="text-base">Initializing Code Environment...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-6 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#00ff95_1px,transparent_1px)] opacity-[0.05] [background-size:16px_16px] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Code2 size={24} className="text-green-400" />
            <h1 className="text-2xl font-bold tracking-wider">
              {question.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-1 rounded border border-green-700 text-green-200 bg-[#0f0f0f]/70 shadow shadow-green-500/20">
            <Clock10 size={16} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full h-2 bg-green-900 rounded-full mb-4 overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 120) * 100}%` }}
          />
        </div>

        {/* Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={submitted}
          placeholder={`Write your ${question.language} code here...`}
          className="w-full h-64 p-4 rounded-md bg-[#0a0a0a] text-green-300 border border-green-600 placeholder:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow-[0_0_12px_#00ff95]/20"
        />

        {/* Submit Button */}
        <button
          onClick={() => handleSubmit(false)}
          disabled={submitted}
          className={`mt-6 w-full py-3 rounded font-bold tracking-wider transition-all duration-200 ${
            submitted
              ? "bg-green-900 text-green-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-400 text-black shadow-md shadow-green-500/30"
          }`}
        >
          {submitted ? "✔ Code Submitted" : "🚀 Submit Code"}
        </button>

        {/* Result Message */}
        {submitted && resultMessage && (
          <div className="mt-6 p-4 bg-green-900 text-green-300 border border-green-600 rounded shadow shadow-green-500/10 text-center">
            <CheckCircle className="inline-block mr-2 text-green-400" />
            {resultMessage}
            <p className="text-sm mt-1 opacity-60">Submitted by: <strong>{userEmail}</strong></p>
          </div>
        )}

        <p className="text-xs mt-8 text-green-600 text-center opacity-50">
          Your code is secure. Write wisely 🧠
        </p>
      </div>
    </main>
  );
}
