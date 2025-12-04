import { useState, useEffect, useRef } from 'react';

interface DataPoint {
  value: number;
  timestamp: number;
}

export const SystemMonitor = () => {
  const [data, setData] = useState<DataPoint[]>(() => {
    const initialData: DataPoint[] = [];
    for (let i = 0; i < 50; i++) {
      initialData.push({
        value: Math.floor(Math.random() * 60) + 20,
        timestamp: i
      });
    }
    return initialData;
  });

  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    const updateData = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current >= 100) {
        setData(prevData => {
          const newData = [...prevData.slice(1)];
          const lastValue = prevData[prevData.length - 1].value;
          const change = (Math.random() - 0.5) * 15;
          let newValue = lastValue + change;
          newValue = Math.max(10, Math.min(95, newValue));
          newData.push({ 
            value: newValue, 
            timestamp: prevData[prevData.length - 1].timestamp + 1 
          });
          return newData;
        });
        lastUpdateRef.current = now;
      }
      animationRef.current = requestAnimationFrame(updateData);
    };

    animationRef.current = requestAnimationFrame(updateData);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const width = 320;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 35;
  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;

  const maxY = 100;
  const maxX = 250;
  const yTicks = [0, 25, 50, 75, 100];
  const xTicks = [0, 50, 100, 150, 200, 250];

  const createPath = () => {
    if (data.length === 0) return '';
    
    const points: string[] = [];
    data.forEach((point, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * graphWidth;
      const y = paddingTop + graphHeight - (point.value / maxY) * graphHeight;
      points.push(`${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    });
    
    return points.join(' ');
  };

  const createAreaPath = () => {
    if (data.length === 0) return '';
    
    const linePath = createPath();
    const lastX = paddingLeft + graphWidth;
    const firstX = paddingLeft;
    const bottomY = paddingTop + graphHeight;
    
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  return (
    <div className="w-full max-w-sm border-3 border-primary bg-card animate-fade-in">
      <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-primary to-accent">
        <p className="font-mono font-black text-xs text-foreground tracking-widest">
          PROCESSAMENTO DO SERVIDOR
        </p>
      </div>
      
      <div className="px-3 py-2 border-b-2 border-primary/30">
        <p className="font-mono text-xs text-muted-foreground">
          Frequência de solicitações da api
        </p>
      </div>

      <div className="p-3">
        <svg 
          width="100%" 
          height={height} 
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="areaGradientBrutalist" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.4" />
              <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="lineGradientBrutalist" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="[stop-color:hsl(var(--primary))]" />
              <stop offset="100%" className="[stop-color:hsl(var(--accent))]" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => {
            const y = paddingTop + graphHeight - (tick / maxY) * graphHeight;
            return (
              <g key={`y-${tick}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={paddingLeft + graphWidth}
                  y2={y}
                  className="stroke-primary/15"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  className="fill-muted-foreground font-mono"
                  fontSize="10"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {xTicks.map((tick) => {
            const x = paddingLeft + (tick / maxX) * graphWidth;
            return (
              <g key={`x-${tick}`}>
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={paddingTop + graphHeight}
                  className="stroke-primary/15"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={paddingTop + graphHeight + 18}
                  className="fill-muted-foreground font-mono"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <path
            d={createAreaPath()}
            fill="url(#areaGradientBrutalist)"
          />

          <path
            d={createPath()}
            fill="none"
            stroke="url(#lineGradientBrutalist)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.filter((_, i) => i % 5 === 0).map((point, index) => {
            const actualIndex = index * 5;
            const x = paddingLeft + (actualIndex / (data.length - 1)) * graphWidth;
            const y = paddingTop + graphHeight - (point.value / maxY) * graphHeight;
            return (
              <circle 
                key={actualIndex} 
                cx={x.toFixed(1)} 
                cy={y.toFixed(1)} 
                r="2.5" 
                className="fill-accent"
                opacity="0.8"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
