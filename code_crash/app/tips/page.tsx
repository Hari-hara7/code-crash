'use client';

import { useEffect, useState } from 'react';

type Tip = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function TipsPage() {
  const [form, setForm] = useState({ content: '', author: '' });
  const [tips, setTips] = useState<Tip[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    const res = await fetch('/api/tips');
    const data = await res.json();
    setTips(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content) return setStatus('⚠️ Tip content is required.');

    setStatus('⏳ Submitting...');
    const res = await fetch('/api/tips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ content: '', author: '' });
      setStatus('✅ Tip submitted!');
      fetchTips();
    } else {
      setStatus('❌ Failed to submit tip.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 md:p-10 font-mono">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-green-500 mb-4">💡 Share a Tip</h1>
          <form onSubmit={handleSubmit} className="space-y-4 bg-[#0f0f0f] border border-green-600 p-6 rounded-xl shadow">
            <textarea
              name="content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Your programming tip..."
              className="w-full bg-black border border-green-700 text-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              rows={4}
            />
            <input
              name="author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Your name (or leave Anonymous)"
              className="w-full bg-black border border-green-700 text-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-2 rounded transition"
            >
              🚀 Submit Tip
            </button>
            {status && <p className="text-sm mt-2 text-green-400">{status}</p>}
          </form>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-green-500 mb-4">📜 Community Tips</h2>
          <div className="space-y-4">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-[#0f0f0f] border border-green-700 p-4 rounded-xl shadow-md"
              >
                <p className="text-green-300 text-lg">"{tip.content}"</p>
                <div className="text-sm text-green-500 mt-2">
                  — {tip.author || 'Anonymous'} on {new Date(tip.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
