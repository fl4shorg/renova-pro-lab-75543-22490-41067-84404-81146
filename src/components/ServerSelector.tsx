import { Server } from '@/types/api';
import { ThemeToggle } from './ThemeToggle';

interface ServerSelectorProps {
  servers: Server[];
  selectedServer: string;
  onServerChange: (url: string) => void;
}

export const ServerSelector = ({ servers, selectedServer, onServerChange }: ServerSelectorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-xs font-bold text-muted-foreground font-sans uppercase tracking-wider">
          Selecionar Servidor
        </label>
        <ThemeToggle />
      </div>
      <div className="relative">
        <select
          value={selectedServer}
          onChange={(e) => onServerChange(e.target.value)}
          className="w-full px-5 py-4 pr-12 rounded-2xl border-2 border-border/50 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card/80 backdrop-blur-sm text-foreground appearance-none font-mono transition-all duration-300 cursor-pointer hover:border-primary/50 hover:bg-card shadow-lg hover:shadow-glow"
        >
          {servers.map((server) => (
            <option key={server.url} value={server.url} className="bg-card text-foreground py-2">
              {server.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-primary transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
