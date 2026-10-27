import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { X, ShieldCheck, KeyRound } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('gopher123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('http://127.0.0.1:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Autentikasi gagal');
      }

      const data = await res.json();
      login(data.token, data.user);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <KeyRound size={18} className="text-white" />
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              JWT Sign In
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Credentials reminder */}
        <div className="p-3 rounded-xl bg-[#181818] border border-[#262626] text-[11px] font-mono space-y-1">
          <div className="text-neutral-400 uppercase tracking-wider text-[10px]">
            Default Demo Credentials
          </div>
          <div className="text-neutral-300">
            User: <span className="text-white font-bold">admin</span> | Pass: <span className="text-white font-bold">gopher123</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900 text-xs font-mono text-red-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-neutral-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-white text-black font-semibold uppercase tracking-wider hover:bg-neutral-200 transition text-[11px] disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Authorize Bearer Token'}
          </button>
        </form>

        <p className="text-[10px] font-mono text-neutral-400 text-center">
          HMAC-SHA256 signature verified by Golang Auth Middleware
        </p>

      </div>
    </div>
  );
};
