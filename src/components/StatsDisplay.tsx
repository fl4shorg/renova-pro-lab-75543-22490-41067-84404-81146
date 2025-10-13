interface StatsDisplayProps {
  totalEndpoints: number;
  totalCategories: number;
}

export const StatsDisplay = ({ totalEndpoints, totalCategories }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in">
      {/* Total de Endpoints */}
      <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-elegant">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">system.endpoints</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              {totalEndpoints}
            </span>
            <span className="text-sm font-mono text-muted-foreground/60">routes</span>
          </div>
          <div className="mt-3 h-1 w-full bg-gradient-to-r from-primary/20 via-primary/40 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Categorias */}
      <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-elegant">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">system.categories</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              {totalCategories}
            </span>
            <span className="text-sm font-mono text-muted-foreground/60">groups</span>
          </div>
          <div className="mt-3 h-1 w-full bg-gradient-to-r from-primary/20 via-primary/40 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
