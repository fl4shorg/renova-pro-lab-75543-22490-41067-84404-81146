import { useState, useEffect } from 'react';

interface RequestData {
  requests: number;
}

export const SystemMonitor = () => {
  const [data, setData] = useState<RequestData[]>([
    { requests: 45 },
    { requests: 38 },
    { requests: 62 },
    { requests: 55 },
    { requests: 72 },
    { requests: 48 },
    { requests: 65 },
    { requests: 52 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const newRequests = Math.floor(Math.random() * 80) + 20;
        newData.push({ requests: newRequests });
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const maxRequests = Math.max(...data.map(d => d.requests), 100);
  const barWidth = 100 / data.length;

  return (
    <div className="w-full max-w-sm border-3 border-primary bg-card animate-fade-in">
      {/* Header */}
      <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-primary to-accent">
        <p className="font-mono font-black text-xs text-foreground tracking-widest">
          MONITOR DO SISTEMA
        </p>
      </div>

      {/* Graph - Clean */}
      <div className="p-4">
        <div className="flex items-end justify-between h-32 gap-1">
          {data.map((item, index) => {
            const height = (item.requests / maxRequests) * 100;
            const isRecent = index >= data.length - 3;
            return (
              <div
                key={index}
                className="flex-1 flex items-end justify-center"
                style={{ width: `${barWidth}%` }}
              >
                <div
                  className={`w-full transition-all duration-500 border-t-2 ${
                    isRecent
                      ? 'bg-accent border-accent'
                      : 'bg-primary border-primary'
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
