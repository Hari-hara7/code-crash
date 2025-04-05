"use client"
import { useState } from "react"

interface Props {
  code: string
  setCode: (val: string) => void
  language?: "java" | "cpp"
}

export default function CodeEditor({ code, setCode, language = "java" }: Props) {
  return (
    <div className="mt-4">
      <label className="block mb-2 font-semibold capitalize">{language} Code:</label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-4 text-black bg-gray-100 rounded resize-none font-mono"
        placeholder={`Write your ${language} code here...`}
      />
    </div>
  )
}
