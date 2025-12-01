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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-droplet-fill" viewBox="0 0 16 16">
            <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"/>
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
