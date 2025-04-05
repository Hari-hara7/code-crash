"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [questions, setQuestions] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch("/api/question-list").then((res) => res.json()).then(setQuestions)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Code Portal</h1>
      <ul className="grid gap-4">
        {questions.map((q: any) => (
          <li
            key={q.id}
            onClick={() => router.push(`/question/${q.id}`)}
            className="p-4 bg-gray-800 rounded hover:bg-yellow-500 hover:text-black cursor-pointer"
          >
            {q.title} ({q.language})
          </li>
        ))}
      </ul>
    </div>
  )
}
