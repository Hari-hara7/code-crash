"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function QuestionPage() {
  const { id } = useParams()
  const [question, setQuestion] = useState<any>(null)
  const [code, setCode] = useState("")

  useEffect(() => {
    fetch(`/api/question/${id}`)
      .then((res) => res.json())
      .then(setQuestion)
  }, [id])

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const res = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({
        questionId: id,
        userId: user.id,
        userCode: code,
      }),
    })

    const { isCorrect } = await res.json()
    alert(isCorrect ? "✅ Correct Answer!" : "❌ Wrong Answer")
  }

  if (!question) return <div className="text-white p-8">Loading...</div>

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-4 h-60 text-black rounded bg-gray-100"
        placeholder={`Write your ${question.language} code here...`}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded font-bold"
      >
        Submit Code
      </button>
    </div>
  )
}
