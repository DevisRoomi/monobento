import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Terminal, Shield, LogOut, ExternalLink, Cpu } from 'lucide-react';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenNewProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogin, onOpenNewProject }) => {
  const { user, token, logout } = useAuth();

  return (
    <header className="border-b border-[#222222] bg-[#0c0c0c]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-mono font-bold text-base shadow-sm">
            MB
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-white uppercase text-sm">MONOBENTO</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/20">
                GOLANG + REACT
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                HERD ACTIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 hidden sm:block">
              Monochromatic Bento Architecture • TanStack Query • JWT Protected
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/DevisRoomi/monobento"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-[#222222] hover:border-neutral-700 transition"
          >
            <span>GitHub</span>
            <ExternalLink size={12} />
          </a>

          {token && user ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenNewProject}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition"
              >
                + New Bento Card
              </button>
              <div className="hidden sm:flex items-center space-x-2 bg-[#161616] border border-[#262626] px-3 py-1.5 rounded-lg text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-medium">{user.username}</span>
                <span className="text-neutral-500">({user.role})</span>
              </div>
              <button
                onClick={logout}
                title="Sign out JWT"
                className="p-1.5 rounded-lg border border-[#222222] hover:border-red-900 text-neutral-400 hover:text-red-400 hover:bg-red-950/20 transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-white transition"
            >
              <Shield size={13} className="text-neutral-400" />
              <span>JWT Sign In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
