import { Server } from '@/types/api';
import { ThemeToggle } from './ThemeToggle';

interface ServerSelectorProps {
  servers: Server[];
  selectedServer: string;
  onServerChange: (url: string) => void;
}

export const ServerSelector = ({ servers, selectedServer, onServerChange }: ServerSelectorProps) => {
  return (
    <div className="mb-8 border-3 border-primary bg-card">
      <div className="flex items-center justify-between border-b-3 border-primary px-4 py-3 bg-gradient-to-r from-primary to-accent">
        <label className="font-mono font-black text-xs text-foreground tracking-widest uppercase">
          SELECIONAR SERVIDOR
        </label>
        <ThemeToggle />
      </div>
      <div className="p-4">
        <select
          value={selectedServer}
          onChange={(e) => onServerChange(e.target.value)}
          className="w-full px-3 py-2 border-2 border-primary text-sm font-mono font-bold bg-card text-foreground appearance-none cursor-pointer focus:outline-none focus:border-accent"
        >
          {servers.map((server) => (
            <option key={server.url} value={server.url} className="bg-card text-foreground py-1">
              {server.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
