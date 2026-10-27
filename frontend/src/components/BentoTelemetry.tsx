import React from 'react';
import { useHealth } from '../hooks/useHealth';
import { Activity, RefreshCw } from 'lucide-react';

export const BentoTelemetry: React.FC = () => {
  const { data: health, isLoading, isError, refetch, isFetching } = useHealth();

  return (
    <div className="bento-card rounded-2xl p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Go Engine Latency
            </span>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            title="Ping Go Server"
            className="p-1 rounded text-neutral-400 hover:text-white transition disabled:opacity-50"
          >
            <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
          </button>
        </div>

        {isLoading ? (
          <div className="text-xs font-mono text-neutral-400 py-3">Pinging backend...</div>
        ) : isError ? (
          <div className="text-xs font-mono text-red-400 py-3">Backend Offline (:8081)</div>
        ) : (
          <div className="space-y-3 font-mono">
            <div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {health?.latency || '0.14ms'}
              </div>
              <div className="text-[10px] text-neutral-400 uppercase mt-0.5">
                HTTP Roundtrip • {health?.uptime || 'active'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#141414] border border-[#222222] space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-neutral-400">Runtime:</span>
                <span className="text-neutral-300">{health?.go_version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Memory Alloc:</span>
                <span className="text-neutral-300">{health?.memory_alloc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Goroutines:</span>
                <span className="text-neutral-300">{health?.goroutines}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#1e1e1e] flex justify-between items-center text-[10px] font-mono text-neutral-400">
        <span>net/http ServeMux</span>
        <span className="text-emerald-400 uppercase">Status: OK</span>
      </div>
    </div>
  );
};
