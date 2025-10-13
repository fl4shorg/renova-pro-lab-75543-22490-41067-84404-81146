interface StatsDisplayProps {
  totalEndpoints: number;
  totalCategories: number;
}

export const StatsDisplay = ({ totalEndpoints, totalCategories }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in">
      {/* Total de Endpoints */}
      <div className="group relative overflow-hidden rounded-lg border border-primary/20 glass-effect transition-all duration-300 hover:border-primary/40 hover:shadow-elegant">
        <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        <div className="absolute inset-0 gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary shadow-glow animate-pulse"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">sistema.endpoints</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono gradient-primary bg-clip-text text-transparent">
              {totalEndpoints}
            </span>
            <span className="text-sm font-mono text-muted-foreground/60">rotas</span>
          </div>
          <div className="mt-3 h-1 w-full gradient-primary rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Categorias */}
      <div className="group relative overflow-hidden rounded-lg border border-primary/20 glass-effect transition-all duration-300 hover:border-primary/40 hover:shadow-elegant">
        <div className="absolute inset-0 gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        <div className="absolute inset-0 gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary shadow-glow animate-pulse"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">sistema.categorias</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono gradient-secondary bg-clip-text text-transparent">
              {totalCategories}
            </span>
            <span className="text-sm font-mono text-muted-foreground/60">grupos</span>
          </div>
          <div className="mt-3 h-1 w-full gradient-secondary rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};
