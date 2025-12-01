import { Bot } from 'lucide-react';

interface StatsDisplayProps {
  totalEndpoints: number;
  totalCategories: number;
}

export const StatsDisplay = ({ totalEndpoints, totalCategories }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-8 animate-fade-in max-w-2xl">
      {/* Endpoints Card */}
      <div className="border-3 border-primary bg-card">
        <div className="border-b-3 border-primary px-3 py-2 bg-primary/20">
          <p className="font-mono font-black text-xs text-foreground tracking-widest">
            SISTEMA.ENDPOINTS
          </p>
        </div>
        <div className="p-3">
          <p className="font-mono font-black text-2xl text-primary mb-1">
            {totalEndpoints}
          </p>
          <p className="font-mono text-xs text-muted-foreground">ROTAS</p>
        </div>
      </div>

      {/* Categories Card */}
      <div className="border-3 border-primary bg-card">
        <div className="border-b-3 border-primary px-3 py-2 bg-primary/20">
          <p className="font-mono font-black text-xs text-foreground tracking-widest">
            SISTEMA.CATEGORIAS
          </p>
        </div>
        <div className="p-3">
          <p className="font-mono font-black text-2xl text-accent mb-1">
            {totalCategories}
          </p>
          <p className="font-mono text-xs text-muted-foreground">GRUPOS</p>
        </div>
      </div>

      {/* Bot Goddard */}
      <div className="border-3 border-primary bg-card">
        <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-green-600 to-primary">
          <p className="font-mono font-black text-xs text-foreground tracking-widest">
            SISTEMA.BOTS
          </p>
        </div>
        <div className="p-3">
          <p className="font-mono font-black text-lg text-foreground mb-1">
            GODDARD
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500"></div>
            <p className="font-mono text-xs font-bold text-green-500 uppercase">ATIVO DEV</p>
          </div>
        </div>
      </div>

      {/* Bot Muzan */}
      <div className="border-3 border-primary bg-card">
        <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-red-600 to-primary">
          <p className="font-mono font-black text-xs text-foreground tracking-widest">
            SISTEMA.BOTS
          </p>
        </div>
        <div className="p-3">
          <p className="font-mono font-black text-lg text-foreground mb-1">
            MUZAN
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500"></div>
            <p className="font-mono text-xs font-bold text-red-500 uppercase">DEV OFF</p>
          </div>
        </div>
      </div>
    </div>
  );
};
