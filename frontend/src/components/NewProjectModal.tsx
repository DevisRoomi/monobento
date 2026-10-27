import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { X, Plus, Layers } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const { createProject, isCreating } = useProjects();
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Fullstack System');
  const [techStackStr, setTechStackStr] = useState('Golang, React, TypeScript');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [metrics, setMetrics] = useState('0.15ms Latency • 99.9% Uptime');
  const [colSpan, setColSpan] = useState(1);
  const [rowSpan, setRowSpan] = useState(1);
  const [featured, setFeatured] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const techStack = techStackStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await createProject({
        title,
        tagline,
        category,
        tech_stack: techStack,
        github_url: githubUrl || undefined,
        live_url: liveUrl || undefined,
        metrics,
        col_span: Number(colSpan),
        row_span: Number(rowSpan),
        featured,
      });

      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal membuat project node');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plus size={18} className="text-white" />
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              New Bento Card Node
            </h2>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition p-1">
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900 text-xs font-mono text-red-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          <div>
            <label className="block text-neutral-400 mb-1">Project Title</label>
            <input
              type="text"
              placeholder="e.g. Distributed Task Queue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Tagline / Short Description</label>
            <input
              type="text"
              placeholder="High throughput background worker engine"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Grid Width (1 or 2)</label>
              <select
                value={colSpan}
                onChange={(e) => setColSpan(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
              >
                <option value={1}>1 Column</option>
                <option value={2}>2 Columns (Wide)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techStackStr}
              onChange={(e) => setTechStackStr(e.target.value)}
              placeholder="Golang, Redis, Docker, React"
              className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">GitHub URL (Optional)</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Live URL (Optional)</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="http://..."
                className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Metrics / Performance Note</label>
            <input
              type="text"
              value={metrics}
              onChange={(e) => setMetrics(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-white focus:outline-none focus:border-white transition"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="featCheck"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded bg-[#161616] border-neutral-700 text-white focus:ring-0"
            />
            <label htmlFor="featCheck" className="text-neutral-300 cursor-pointer">
              Mark as Featured Card
            </label>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-2.5 rounded-xl bg-white text-black font-semibold uppercase tracking-wider hover:bg-neutral-200 transition text-[11px] disabled:opacity-50 mt-2"
          >
            {isCreating ? 'Broadcasting Node...' : 'Publish Bento Node via JWT'}
          </button>
        </form>
      </div>
    </div>
  );
};
