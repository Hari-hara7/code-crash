"use client"
import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Code Checker</h1>
      <nav className="flex gap-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/login" className="hover:underline">Logout</Link>
      </nav>
    </header>
  )
}
