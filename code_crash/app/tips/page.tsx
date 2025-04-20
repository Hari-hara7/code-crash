'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Send, User, MessageSquareText, Edit2, Trash2, X, ThumbsUp } from 'lucide-react';

type Tip = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  votes: number;
};

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [form, setForm] = useState({ content: '', author: '' });
  const [editTipId, setEditTipId] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const fetchTips = async () => {
    const res = await fetch('/api/tips');
    const data = await res.json();
    setTips(data);
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(editTipId ? '✏️ Updating tip...' : '⏳ Submitting...');

    const url = '/api/tips';
    const method = editTipId ? 'PATCH' : 'POST';
    const payload = editTipId
      ? { id: editTipId, content: form.content }
      : form;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus(editTipId ? '✅ Tip updated!' : '✅ Tip submitted!');
      setForm({ content: '', author: '' });
      setEditTipId(null);
      fetchTips();
    } else {
      setStatus('❌ Failed to submit tip.');
    }

    setTimeout(() => setStatus(''), 3000);
  };

  const handleEdit = (tip: Tip) => {
    setForm({ content: tip.content, author: tip.author });
    setEditTipId(tip.id);
    setStatus('📝 Editing...');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tip?')) return;

    const res = await fetch('/api/tips', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setStatus('🗑️ Tip deleted.');
      fetchTips();
    }
  };

  const handleVote = async (tipId: string) => {
    const userId = 'demo-user-id'; // Replace with real userId in production

    const res = await fetch('/api/tips/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipId, userId }),
    });

    if (res.ok) {
      fetchTips();
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 md:p-10 font-mono">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold flex items-center gap-2 text-green-500">
          <Sparkles className="text-green-400" />
          Tips & Tricks
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-[#0f0f0f] border border-green-600 p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-2 text-green-300">
            <MessageSquareText className="text-green-500" />
            <label htmlFor="content">Your Tip</label>
          </div>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="💡 Share a helpful programming tip..."
            className="w-full bg-black border border-green-700 text-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            required
          />

          {!editTipId && (
            <>
              <div className="flex items-center gap-2 text-green-300">
                <User className="text-green-500" />
                <label htmlFor="author">Your Name</label>
              </div>
              <input
                id="author"
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Optional (Leave Anonymous)"
                className="w-full bg-black border border-green-700 text-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </>
          )}

          <div className="flex gap-3 items-center flex-wrap">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 rounded transition"
            >
              <Send size={18} />
              {editTipId ? 'Update Tip' : 'Share Tip'}
            </button>

            {editTipId && (
              <button
                type="button"
                onClick={() => {
                  setEditTipId(null);
                  setForm({ content: '', author: '' });
                }}
                className="flex items-center gap-1 text-sm text-red-400 underline"
              >
                <X size={16} />
                Cancel Edit
              </button>
            )}
          </div>

          {status && <p className="text-sm mt-2 text-green-400">{status}</p>}
        </form>

        {/* Tips list */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-green-500">🧠 Tips from the Community</h2>
          {tips.length === 0 ? (
            <p className="text-green-300">No tips shared yet. Be the first!</p>
          ) : (
            tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-[#0f0f0f] border border-green-700 p-4 rounded-xl shadow-md space-y-2"
              >
                <p className="text-green-300 text-base">“{tip.content}”</p>
                <div className="text-sm text-green-500">
                  — {tip.author || 'Anonymous'} on{' '}
                  {new Date(tip.createdAt).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-green-400 mt-2 items-center">
                  <button
                    onClick={() => handleVote(tip.id)}
                    className="flex items-center gap-1 hover:text-green-300 transition"
                  >
                    <ThumbsUp size={14} />
                    Like ({tip.votes})
                  </button>

                  <button
                    onClick={() => handleEdit(tip)}
                    className="flex items-center gap-1 hover:text-green-300 transition"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tip.id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
