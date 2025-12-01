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

  return (
    <div className="w-full max-w-sm border-3 border-primary bg-card animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-primary to-accent">
        <p className="font-mono font-black text-xs text-foreground tracking-widest">
          MONITOR DO SISTEMA
        </p>
      </div>

      {/* Graph Animation */}
      <div className="p-4 h-24 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 rounded-sm border border-primary/30 flex items-end justify-around gap-1 overflow-hidden px-2 py-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-accent to-primary rounded-sm"
              style={{
                height: `${(item.value / 100) * 100}%`,
                opacity: 0.6 + (index / data.length) * 0.4,
                animation: `fadeIn 0.8s ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
