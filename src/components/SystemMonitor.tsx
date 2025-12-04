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

  const width = 400;
  const height = 280;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;
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
    <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ backgroundColor: '#5C2A4A' }}>
      <div className="p-6">
        <h2 className="text-white text-xl font-bold mb-1">Processamento do servidor</h2>
        <p className="text-white/70 text-sm mb-6">Frequência de solicitações da api</p>
        
        <svg 
          width="100%" 
          height={height} 
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
          style={{ transition: 'all 0.1s ease-out' }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
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
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  fill="rgba(255, 255, 255, 0.7)"
                  fontSize="12"
                  textAnchor="end"
                  fontFamily="monospace"
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
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={paddingTop + graphHeight + 25}
                  fill="rgba(255, 255, 255, 0.7)"
                  fontSize="12"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <path
            d={createAreaPath()}
            fill="url(#areaGradient)"
            style={{ transition: 'all 0.1s ease-out' }}
          />

          <path
            d={createPath()}
            fill="none"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            style={{ transition: 'all 0.1s ease-out' }}
          />
        </svg>
      </div>
    </div>
  );
};
