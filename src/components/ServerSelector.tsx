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
        <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground font-sans uppercase tracking-wider">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 2h14V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1zm0 2v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm15 0H1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zm-2-4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0m-1.5 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1"/>
          </svg>
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
