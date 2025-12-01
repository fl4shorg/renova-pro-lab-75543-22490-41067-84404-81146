import { useState, useEffect } from 'react';

interface DataPoint {
  value: number;
}

export const SystemMonitor = () => {
  const [data, setData] = useState<DataPoint[]>([
    { value: 45 },
    { value: 38 },
    { value: 62 },
    { value: 55 },
    { value: 72 },
    { value: 48 },
    { value: 65 },
    { value: 52 },
    { value: 70 },
    { value: 42 },
    { value: 58 },
    { value: 68 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const newValue = Math.floor(Math.random() * 80) + 20;
        newData.push({ value: newValue });
        return newData;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const maxValue = 100;
  const chartWidth = 320;
  const chartHeight = 120;
  const padding = 8;
  const innerWidth = chartWidth - padding * 2;
  const innerHeight = chartHeight - padding * 2;

  // Calcular pontos do gráfico
  const pointSpacing = innerWidth / (data.length - 1);
  const points = data.map((item, index) => {
    const x = padding + index * pointSpacing;
    const y = padding + innerHeight - (item.value / maxValue) * innerHeight;
    return `${x},${y}`;
  }).join(' ');

  // Calcular área sob a linha (para preenchimento)
  const areaPoints = data.map((item, index) => {
    const x = padding + index * pointSpacing;
    const y = padding + innerHeight - (item.value / maxValue) * innerHeight;
    return `${x},${y}`;
  });
  areaPoints.push(`${padding + (data.length - 1) * pointSpacing},${padding + innerHeight}`);
  areaPoints.push(`${padding},${padding + innerHeight}`);
  const areaPath = areaPoints.join(' ');

  return (
    <div className="w-full max-w-sm border-3 border-primary bg-card animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-primary to-accent">
        <p className="font-mono font-black text-xs text-foreground tracking-widest">
          MONITOR DO SISTEMA
        </p>
      </div>

      {/* Graph */}
      <div className="p-3 flex justify-center overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Grid background */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(262 83% 58%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(262 83% 58%)" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={padding}
            y1={padding + innerHeight * 0.25}
            x2={chartWidth - padding}
            y2={padding + innerHeight * 0.25}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <line
            x1={padding}
            y1={padding + innerHeight * 0.5}
            x2={chartWidth - padding}
            y2={padding + innerHeight * 0.5}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <line
            x1={padding}
            y1={padding + innerHeight * 0.75}
            x2={chartWidth - padding}
            y2={padding + innerHeight * 0.75}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity="0.2"
          />

          {/* Área sob a linha */}
          <polygon
            points={areaPath}
            fill="url(#areaGradient)"
          />

          {/* Linha principal */}
          <polyline
            points={points}
            fill="none"
            stroke="hsl(190 95% 55%)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pontos */}
          {data.map((item, index) => {
            const x = padding + index * pointSpacing;
            const y = padding + innerHeight - (item.value / maxValue) * innerHeight;
            const isRecent = index >= data.length - 3;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={isRecent ? "3" : "2"}
                fill={isRecent ? "hsl(190 95% 55%)" : "hsl(262 83% 58%)"}
                opacity={isRecent ? "1" : "0.6"}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
