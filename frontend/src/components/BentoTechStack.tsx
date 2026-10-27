import React from 'react';
import { Cpu, Terminal, Database, Code, Globe, Server } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'core' | 'frontend' | 'backend' | 'tooling';
  role: string;
}

const TECH_MATRIX: TechItem[] = [
  { name: 'Golang 1.27', category: 'backend', role: 'RESTful API & Concurrency' },
  { name: 'net/http', category: 'backend', role: 'Stdlib Routing & Handler Mux' },
  { name: 'JWT Auth', category: 'backend', role: 'HMAC-SHA256 Token Guards' },
  { name: 'React 19', category: 'frontend', role: 'Component Architecture' },
  { name: 'TypeScript', category: 'frontend', role: 'Strict Type Soundness' },
  { name: 'TanStack Query', category: 'frontend', role: 'Client Cache & Mutations' },
  { name: 'Tailwind CSS', category: 'frontend', role: 'Monochromatic Design System' },
  { name: 'Laravel Herd', category: 'tooling', role: 'Nginx Virtual Host Gateway' },
  { name: 'FlyEnv MySQL', category: 'tooling', role: 'Relational Database Engine' },
  { name: 'Git & GitHub', category: 'tooling', role: 'Version Control & Automation' },
];

export const BentoTechStack: React.FC = () => {
  return (
    <div className="col-span-1 md:col-span-2 bento-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Cpu size={16} className="text-white" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Tech Matrix & Ecosystem
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">10 Core Technologies</span>
        </div>

        <p className="text-xs text-neutral-400 font-sans mb-5">
          Curated fullstack foundation matching the Go + React tutorial book stack:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {TECH_MATRIX.map((item, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#141414] border border-[#222222] hover:border-neutral-500 transition group"
            >
              <div className="text-xs font-mono font-bold text-white group-hover:text-white flex items-center justify-between">
                <span>{item.name}</span>
                <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-white/5 text-neutral-400">
                  {item.category}
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 mt-1 line-clamp-1">
                {item.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#1e1e1e] flex justify-between items-center text-[10px] font-mono text-neutral-400">
        <span>Zero Unnecessary Abstractions</span>
        <span className="text-neutral-300">Monochromatic Standard</span>
      </div>
    </div>
  );
};
