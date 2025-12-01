import { Server } from '@/types/api';
import { ThemeToggle } from './ThemeToggle';

interface ServerSelectorProps {
  servers: Server[];
  selectedServer: string;
  onServerChange: (url: string) => void;
}

export const ServerSelector = ({ servers, selectedServer, onServerChange }: ServerSelectorProps) => {
  return (
    <div className="mb-8 border-3 border-primary bg-card animate-fade-in">
      {/* Header */}
      <div className="border-b-3 border-primary px-4 py-3 bg-gradient-to-r from-primary to-accent flex items-center justify-between">
        <h3 className="font-mono font-black text-sm text-foreground tracking-widest">
          SELECIONAR SERVIDOR
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-foreground"></div>
          <ThemeToggle />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* URL Display */}
        <div className="border-2 border-primary px-3 py-2 bg-primary/5">
          <p className="font-mono text-xs text-muted-foreground">ENDPOINT ATIVO:</p>
          <p className="font-mono font-bold text-xs text-foreground break-all mt-1">
            {selectedServer}
          </p>
        </div>

        {/* Server Selector */}
        <select
          value={selectedServer}
          onChange={(e) => onServerChange(e.target.value)}
          className="w-full px-4 py-3 border-3 border-primary bg-card text-foreground font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer appearance-none transition-all hover:bg-primary/5"
        >
          {servers.map((server) => (
            <option key={server.url} value={server.url} className="bg-card text-foreground">
              {server.name}
            </option>
          ))}
        </select>

        {/* Status Indicator */}
        <div className="border-2 border-primary/50 px-3 py-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-accent animate-pulse"></div>
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            CONECTADO
          </span>
        </div>
      </div>
    </div>
  );
};
