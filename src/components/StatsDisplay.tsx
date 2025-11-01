interface StatsDisplayProps {
  totalEndpoints: number;
  totalCategories: number;
}

export const StatsDisplay = ({ totalEndpoints, totalCategories }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in max-w-md">
      <div className="group relative overflow-hidden rounded-2xl border-2 border-foreground/80 bg-background p-6 transition-all duration-300 hover:border-primary hover:shadow-lg">
        <div className="flex flex-col items-start">
          <span className="text-4xl sm:text-5xl font-black text-foreground mb-2">
            {totalEndpoints}
          </span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Total<br />Endpoints
          </span>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border-2 border-foreground/80 bg-background p-6 transition-all duration-300 hover:border-primary hover:shadow-lg">
        <div className="flex flex-col items-start">
          <span className="text-4xl sm:text-5xl font-black text-foreground mb-2">
            {totalCategories}
          </span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Categories
          </span>
        </div>
      </div>
    </div>
  );
};
