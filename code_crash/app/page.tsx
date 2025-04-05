export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Code Checker</h1>
      <p className="mb-6 text-gray-300">Login and solve coding questions in Java or C++.</p>
      <a
        href="/login"
        className="bg-yellow-500 text-black px-6 py-3 font-bold rounded"
      >
        Go to Login
      </a>
    </main>
  )
}
