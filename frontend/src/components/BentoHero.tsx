import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '../types';
import { MapPin, Clock, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';

export const BentoHero: React.FC = () => {
  const { data: profile } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch('http://127.0.0.1:8081/api/profile');
      if (!res.ok) throw new Error('Failed to load profile');
      return res.json();
    },
  });

  const { hasCopied, copy } = useClipboard();

  const email = profile?.socials?.email || 'abudevis5@gmail.com';

  return (
    <div className="bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
      {/* Background Accent Lines */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Availability Badge */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181818] border border-[#262626] text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-neutral-300 font-medium">AVAILABLE FOR WORK</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">HERD: monobento.test</span>
        </div>

        {/* Profile Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
          <img
            src={profile?.avatar_url || "https://github.com/DevisRoomi.png"}
            alt="Devis Roomi"
            className="w-16 h-16 rounded-xl border border-[#333333] grayscale contrast-125 object-cover"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {profile?.name || 'Devis Roomi'}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-0.5">
              {profile?.role || 'Fullstack Golang & React Engineer'}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-neutral-300 leading-relaxed font-sans max-w-2xl mb-6">
          {profile?.bio ||
            'Specializing in high-throughput backend services using Golang standard library router and sleek, minimal monochromatic user interfaces built with React, TypeScript, and TanStack Query.'}
        </p>

        {/* Location & Timezone pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#161616] border border-[#242424]">
            <MapPin size={12} className="text-neutral-400" />
            <span>{profile?.location || 'Indonesia'}</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#161616] border border-[#242424]">
            <Clock size={12} className="text-neutral-400" />
            <span>{profile?.timezone || 'UTC+07:00 (WIB)'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-[#222222] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => copy(email)}
            className="flex items-center space-x-2 text-xs font-mono px-3.5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition"
          >
            {hasCopied ? <Check size={14} /> : <Copy size={14} />}
            <span>{hasCopied ? 'Email Copied!' : 'Copy Email'}</span>
          </button>
          <a
            href="https://github.com/DevisRoomi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 text-xs font-mono px-3.5 py-2 rounded-xl bg-[#161616] border border-[#2a2a2a] hover:border-neutral-500 text-neutral-300 transition"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="flex items-center space-x-6 text-xs font-mono text-neutral-400">
          <div>
            <div className="text-white font-bold text-base font-mono">
              {profile?.stats?.repos || '19'}
            </div>
            <div className="text-[10px] uppercase text-neutral-400">Repositories</div>
          </div>
          <div>
            <div className="text-white font-bold text-base font-mono">
              {profile?.stats?.commits_year || '412+'}
            </div>
            <div className="text-[10px] uppercase text-neutral-400">Commits YTD</div>
          </div>
          <div>
            <div className="text-white font-bold text-base font-mono">
              {profile?.stats?.system_latency || '0.14ms'}
            </div>
            <div className="text-[10px] uppercase text-neutral-400">API Latency</div>
          </div>
        </div>
      </div>

    </div>
  );
};
