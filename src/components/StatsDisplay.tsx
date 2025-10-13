interface StatsDisplayProps {
  totalEndpoints: number;
  totalCategories: number;
}

export const StatsDisplay = ({ totalEndpoints, totalCategories }: StatsDisplayProps) => {
  return (
    <div className="glass-effect rounded-xl p-6 mb-6 shadow-card hover:shadow-elegant transition-smooth animate-scale-in">
      <div className="grid grid-cols-2 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 gradient-primary opacity-5 rounded-lg group-hover:opacity-10 transition-smooth"></div>
          <div className="relative text-center p-4">
            <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary-glow bg-clip-text text-transparent font-sans mb-1">
              {totalEndpoints}
            </div>
            <div className="text-xs text-muted-foreground font-sans uppercase tracking-wider">Total Endpoints</div>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 gradient-primary opacity-5 rounded-lg group-hover:opacity-10 transition-smooth"></div>
          <div className="relative text-center p-4">
            <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary-glow bg-clip-text text-transparent font-sans mb-1">
              {totalCategories}
            </div>
            <div className="text-xs text-muted-foreground font-sans uppercase tracking-wider">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};
