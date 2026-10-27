import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play } from 'lucide-react';

const PRESET_COMMANDS: Record<string, string> = {
  'curl /api/health': '{"status":"operational","engine":"Golang 1.27","framework":"net/http"}',
  'whoami': 'Devis Roomi • Fullstack Golang & React Developer • Indonesia',
  'cat stack.txt': 'Golang • net/http • JWT • React 19 • TypeScript • TanStack Query • Tailwind',
  'go version': 'go version go1.27.3 windows/amd64',
  'herd status': 'Nginx proxy listening on monobento.test -> public directory',
};

export const BentoTerminal: React.FC = () => {
  const [cmd, setCmd] = useState('curl /api/health');
  const [output, setOutput] = useState(PRESET_COMMANDS['curl /api/health']);

  const runCommand = (commandKey: string) => {
    setCmd(commandKey);
    setOutput(PRESET_COMMANDS[commandKey] || 'Command not found. Try one of the preset pills.');
  };

  return (
    <div className="col-span-1 md:col-span-2 bento-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TerminalIcon size={16} className="text-white" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Interactive Dev Console
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">bash / zsh ready</span>
        </div>

        {/* Command Quick Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(PRESET_COMMANDS).map((k) => (
            <button
              key={k}
              onClick={() => runCommand(k)}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition ${
                cmd === k
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-[#161616] text-neutral-400 border-[#262626] hover:text-white hover:border-neutral-500'
              }`}
            >
              $ {k}
            </button>
          ))}
        </div>

        {/* Terminal Screen */}
        <div className="bg-[#090909] border border-[#222222] rounded-xl p-4 font-mono text-xs text-neutral-300 min-h-[90px] space-y-2">
          <div className="flex items-center space-x-2 text-neutral-400">
            <span className="text-white font-bold">devis@monobento</span>
            <span>:</span>
            <span className="text-neutral-400">~/project</span>
            <span>$ {cmd}</span>
          </div>
          <div className="text-neutral-300 break-words pl-2 border-l border-neutral-700">
            {output}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1e1e1e] flex justify-between items-center text-[10px] font-mono text-neutral-400">
        <span>MSYS Bash + Windows Terminal</span>
        <span className="text-neutral-400">Clean Monochromatic Output</span>
      </div>
    </div>
  );
};
