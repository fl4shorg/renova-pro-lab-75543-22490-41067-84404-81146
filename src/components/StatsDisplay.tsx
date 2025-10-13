interface StatsDisplayProps {
  totalEndpoints: number;
  totalCategories: number;
}

export const StatsDisplay = ({ totalEndpoints, totalCategories }: StatsDisplayProps) => {
  return (
    <div className="glass-effect rounded-xl p-6 mb-6 shadow-card hover:shadow-elegant transition-smooth animate-scale-in">
      <div className="grid grid-cols-2 gap-6">
        <div className="relative group overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent group-hover:from-primary/20 group-hover:via-primary/10 transition-all duration-300"></div>
          <div className="relative text-center p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold bg-gradient-to-br from-primary via-primary-glow to-primary/70 bg-clip-text text-transparent font-sans mb-2 animate-fade-in">
              {totalEndpoints}
            </div>
            <div className="text-sm text-muted-foreground/80 font-sans uppercase tracking-widest font-medium">Total de Endpoints</div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent group-hover:from-primary/20 group-hover:via-primary/10 transition-all duration-300"></div>
          <div className="relative text-center p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold bg-gradient-to-bl from-primary via-primary-glow to-primary/70 bg-clip-text text-transparent font-sans mb-2 animate-fade-in">
              {totalCategories}
            </div>
            <div className="text-sm text-muted-foreground/80 font-sans uppercase tracking-widest font-medium">Categorias</div>
          </div>
        </div>
      </div>
    </div>
  );
};
