import React, { useState } from 'react';
import { Header } from './components/Header';
import { BentoHero } from './components/BentoHero';
import { BentoProjects } from './components/BentoProjects';
import { BentoTechStack } from './components/BentoTechStack';
import { BentoTelemetry } from './components/BentoTelemetry';
import { BentoTerminal } from './components/BentoTerminal';
import { BentoInquiry } from './components/BentoInquiry';
import { LoginModal } from './components/LoginModal';
import { NewProjectModal } from './components/NewProjectModal';

export const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-[#eeeeee] flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenNewProject={() => setIsNewProjectOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        
        {/* Row 1: Hero Identity Card (Wide) + Realtime Go Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BentoHero />
          </div>
          <div className="lg:col-span-1">
            <BentoTelemetry />
          </div>
        </div>

        {/* Section Divider / Label */}
        <div className="flex items-center justify-between pt-4 pb-1 border-b border-[#1c1c1c]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Bento Nodes & System Architecture
            </h2>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            Powered by Golang RESTful API + TanStack Query
          </span>
        </div>

        {/* Row 2: Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BentoProjects />
        </div>

        {/* Row 3: Tech Stack Matrix + Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <BentoTechStack />
          </div>
          <div className="lg:col-span-2">
            <BentoTerminal />
          </div>
        </div>

        {/* Row 4: Direct Inquiries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <BentoInquiry />
          </div>
          <div className="md:col-span-2 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Book Alignment: Fullstack Golang React
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-semibold">
                  100% COVERED
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
                Project ini sengaja dirancang untuk memenuhi seluruh kurikulum dari buku{' '}
                <strong className="text-white">"Fullstack Developer Golang React Untuk Pemula"</strong>:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">1. RESTful API</div>
                  <div className="text-[10px] text-neutral-400">Go net/http stdlib</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">2. JWT Token</div>
                  <div className="text-[10px] text-neutral-400">HS256 Auth Guard</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">3. React + TS</div>
                  <div className="text-[10px] text-neutral-400">Vite 6 + React 19</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">4. React Context</div>
                  <div className="text-[10px] text-neutral-400">AuthContext State</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">5. Custom Hooks</div>
                  <div className="text-[10px] text-neutral-400">useAuth, useProjects</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">6. TanStack Query</div>
                  <div className="text-[10px] text-neutral-400">Queries & Mutations</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">7. Laravel Herd</div>
                  <div className="text-[10px] text-neutral-400">monobento.test</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="text-white font-bold">8. FlyEnv DB</div>
                  <div className="text-[10px] text-neutral-400">Port 3306 Ready</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#1e1e1e] flex flex-wrap justify-between items-center text-[10px] font-mono text-neutral-400 gap-2">
              <span>Author: Devis Roomi</span>
              <span>Theme: The Monochromatic Bento Grid</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#222222] bg-[#0c0c0c] py-8 text-xs font-mono text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-white font-bold">MONOBENTO</span> • The Monochromatic Bento Grid Portfolio
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <a href="http://monobento.test" className="hover:text-white transition">
              Herd: monobento.test
            </a>
            <a href="http://127.0.0.1:8081/api/health" target="_blank" rel="noreferrer" className="hover:text-white transition">
              Go API Health
            </a>
            <a href="https://github.com/DevisRoomi/monobento" target="_blank" rel="noreferrer" className="hover:text-white transition">
              GitHub Repo
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <NewProjectModal isOpen={isNewProjectOpen} onClose={() => setIsNewProjectOpen(false)} />
    </div>
  );
};
