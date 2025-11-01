import { Bot } from 'lucide-react';

interface StatsDisplayProps {
  totalEndpoints: number;
  totalCategories: number;
}

export const StatsDisplay = ({ totalEndpoints, totalCategories }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in max-w-md">
      <div className="group relative overflow-hidden rounded-2xl border border-primary/20 glass-effect transition-all duration-300 hover:border-primary/40 hover:shadow-elegant">
        <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        <div className="absolute inset-0 gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary shadow-glow animate-pulse flex-shrink-0"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">sistema.endpoints</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {totalEndpoints}
            </span>
          </div>
          <span className="text-sm font-mono text-muted-foreground/60">rotas</span>
          <div className="mt-3 h-1 w-full gradient-primary rounded-full opacity-50"></div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-primary/20 glass-effect transition-all duration-300 hover:border-primary/40 hover:shadow-elegant">
        <div className="absolute inset-0 gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        <div className="absolute inset-0 gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary shadow-glow animate-pulse flex-shrink-0"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">sistema.categorias</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {totalCategories}
            </span>
          </div>
          <span className="text-sm font-mono text-muted-foreground/60">grupos</span>
          <div className="mt-3 h-1 w-full gradient-secondary rounded-full opacity-50"></div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-green-500/20 glass-effect transition-all duration-300 hover:border-green-500/40 hover:shadow-elegant">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-2 h-2 text-green-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">sistema.bots</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold font-mono bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">
              GODDARD
            </span>
            <span className="text-xs font-mono text-green-500/80">ativo dev</span>
          </div>
          <div className="mt-3 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-50"></div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-red-500/20 glass-effect transition-all duration-300 hover:border-red-500/40 hover:shadow-elegant">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-2 h-2 text-red-500 flex-shrink-0" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">sistema.bots</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold font-mono bg-gradient-to-r from-red-400 via-orange-500 to-red-400 bg-clip-text text-transparent">
              MUZAN
            </span>
            <span className="text-xs font-mono text-red-500/80">dev off</span>
          </div>
          <div className="mt-3 h-1 w-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};
