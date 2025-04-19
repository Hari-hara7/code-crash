"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setStatus("✅ Feedback submitted!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Submission failed. Try again.");
      }
    } catch (error) {
      setStatus("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 md:p-10 font-mono flex flex-col items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-4xl text-green-500 font-bold mb-2">💬 Feedback</h1>
        <p className="text-sm text-green-600 mb-6">
          We appreciate your feedback. Let us know your thoughts or report an issue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 bg-[#0f0f0f] border border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-[#0f0f0f] border border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 bg-[#0f0f0f] border border-green-700 rounded min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded transition duration-200"
          >
            Submit
          </button>
        </form>
        {status && (
          <p className={`mt-4 text-sm ${status.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
