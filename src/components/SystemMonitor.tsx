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
  const width = 280;
  const height = 100;
  const padding = 10;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const pointSpacing = graphWidth / Math.max(data.length - 1, 1);
  
  const points = data.map((item, index) => {
    const x = padding + index * pointSpacing;
    const y = padding + graphHeight - (item.value / maxValue) * graphHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const areaPoints = [
    ...data.map((item, index) => {
      const x = padding + index * pointSpacing;
      const y = padding + graphHeight - (item.value / maxValue) * graphHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }),
    `${padding + (data.length - 1) * pointSpacing},${padding + graphHeight}`,
    `${padding},${padding + graphHeight}`,
  ].join(' ');

  return (
    <div className="w-full max-w-sm border-3 border-primary bg-card animate-fade-in">
      {/* Header */}
      <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-primary to-accent">
        <p className="font-mono font-black text-xs text-foreground tracking-widest">
          MONITOR DO SISTEMA
        </p>
      </div>

      {/* Graph */}
      <div className="p-3 flex justify-center">
        <svg width="280" height="100" viewBox="0 0 280 100" style={{ overflow: 'hidden' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F01AAE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F01AAE" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid */}
          <line x1="10" y1="35" x2="270" y2="35" stroke="#A85EF5" strokeWidth="1" opacity="0.15" />
          <line x1="10" y1="60" x2="270" y2="60" stroke="#A85EF5" strokeWidth="1" opacity="0.15" />

          {/* Area */}
          <polygon points={areaPoints} fill="url(#lineGradient)" />

          {/* Line */}
          <polyline points={points} fill="none" stroke="#F01AAE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points */}
          {data.map((item, index) => {
            const x = padding + index * pointSpacing;
            const y = padding + graphHeight - (item.value / maxValue) * graphHeight;
            return (
              <circle key={index} cx={x.toFixed(1)} cy={y.toFixed(1)} r="2" fill="#A85EF5" opacity="0.6" />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
