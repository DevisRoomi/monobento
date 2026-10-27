import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { useAuth } from '../hooks/useAuth';
import { ExternalLink, Trash2, Layers, Star, Code2 } from 'lucide-react';

export const BentoProjects: React.FC = () => {
  const { projects, isLoading, isError, deleteProject, isDeleting } = useProjects();
  const { token } = useAuth();

  if (isLoading) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bento-card rounded-2xl p-8 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-neutral-400 font-mono text-xs">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>TanStack Query fetching bento nodes from Go API...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bento-card rounded-2xl p-8 text-center text-xs font-mono text-red-400">
        Failed to fetch projects from Golang backend. Make sure monobento-server is running on :8081.
      </div>
    );
  }

  return (
    <>
      {projects.map((proj) => {
        const isSpanned = proj.col_span > 1;

        return (
          <div
            key={proj.id}
            className={`bento-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden ${
              isSpanned ? 'col-span-1 md:col-span-2' : 'col-span-1'
            }`}
          >
            {/* Header info */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-2 py-0.5 rounded bg-[#181818] border border-[#262626]">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-semibold">
                      <Star size={10} fill="currentColor" />
                      <span>FEATURED</span>
                    </span>
                  )}
                </div>

                {/* Admin controls */}
                <div className="flex items-center space-x-2">
                  {token && (
                    <button
                      onClick={() => {
                        if (confirm(`Hapus node "${proj.title}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      disabled={isDeleting}
                      title="Delete via Golang JWT API"
                      className="p-1 rounded text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-neutral-400 hover:text-white transition"
                    >
                      <Code2 size={15} />
                    </a>
                  )}
                  {proj.live_url && (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-neutral-400 hover:text-white transition"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition">
                {proj.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                {proj.tagline}
              </p>
            </div>

            {/* Tech stack & metrics footer */}
            <div className="mt-6 pt-4 border-t border-[#1c1c1c]">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] border border-[#242424] text-neutral-400 group-hover:border-neutral-700 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{proj.metrics}</span>
                <span className="text-neutral-400 group-hover:text-white transition">→</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
