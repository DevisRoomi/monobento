import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, CheckCircle2 } from 'lucide-react';

export const BentoInquiry: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; message: string }) => {
      const res = await fetch('http://127.0.0.1:8081/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to send inquiry');
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    mutation.mutate({ name, email, message });
  };

  return (
    <div className="bento-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
            Direct Inquiry / Contact
          </span>
          <span className="text-[10px] font-mono text-neutral-400">RESTful Endpoint</span>
        </div>

        {submitted ? (
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 text-center space-y-2">
            <CheckCircle2 size={24} className="mx-auto text-white" />
            <div className="text-xs font-bold text-white font-mono">Pesan Terkirim!</div>
            <div className="text-[11px] text-neutral-400 font-sans">
              Data tersimpan ke Go backend store.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
            <div>
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#222222] text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email (e.g. user@domain.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#222222] text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
              />
            </div>
            <div>
              <textarea
                rows={3}
                placeholder="Tulis pesan atau tawaran project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#222222] text-white placeholder-neutral-500 focus:outline-none focus:border-white transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition flex items-center justify-center space-x-1.5 uppercase tracking-wider text-[11px]"
            >
              <Send size={12} />
              <span>{mutation.isPending ? 'Sending...' : 'Kirim Pesan'}</span>
            </button>
          </form>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#1e1e1e] flex justify-between items-center text-[10px] font-mono text-neutral-400">
        <span>Go Mutex Store</span>
        <span className="text-neutral-400">POST /api/inquiries</span>
      </div>
    </div>
  );
};
