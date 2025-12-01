import { useState, useEffect } from 'react';

interface RequestData {
  time: number;
  requests: number;
}

export const SystemMonitor = () => {
  const [data, setData] = useState<RequestData[]>([
    { time: 0, requests: 45 },
    { time: 1, requests: 38 },
    { time: 2, requests: 62 },
    { time: 3, requests: 55 },
    { time: 4, requests: 72 },
    { time: 5, requests: 48 },
  ]);
  const [currentRequests, setCurrentRequests] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const newRequests = Math.floor(Math.random() * 80) + 20;
        newData.push({
          time: prevData[prevData.length - 1].time + 1,
          requests: newRequests
        });
        setCurrentRequests(newRequests);
        return newData;
      });
    }, 1500);

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

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Current Requests Display */}
        <div className="border-2 border-primary p-3 bg-primary/5">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs font-bold text-muted-foreground">REQUISIÇÕES/s</span>
            <span className="font-mono text-lg font-black text-accent">{currentRequests}</span>
          </div>
          <div className="h-1 w-full bg-primary/20 border-b border-primary">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${(currentRequests / maxRequests) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Graph */}
        <div className="border-2 border-primary p-3 bg-primary/5 min-h-32">
          <div className="flex items-end justify-between h-28 gap-1">
            {data.map((item, index) => {
              const height = (item.requests / maxRequests) * 100;
              const isRecent = index >= data.length - 2;
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group cursor-pointer"
                  style={{ width: `${barWidth}%` }}
                >
                  <div className="relative w-full h-24 flex items-end justify-center">
                    <div
                      className={`w-full transition-all duration-300 border-t-2 ${
                        isRecent
                          ? 'bg-accent border-accent'
                          : 'bg-primary border-primary'
                      }`}
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-mono text-xs font-bold text-foreground bg-card border border-primary px-1 py-0.5 whitespace-nowrap">
                          {item.requests}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground mt-1">
                    {item.time}s
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="border-2 border-primary/50 px-2 py-1 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-foreground">MÁXIMO</span>
            <span className="font-mono text-xs font-bold text-accent">{Math.max(...data.map(d => d.requests))}</span>
          </div>
          <div className="border-2 border-primary/50 px-2 py-1 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-foreground">MÉDIA</span>
            <span className="font-mono text-xs font-bold text-primary">
              {Math.round(data.reduce((acc, d) => acc + d.requests, 0) / data.length)}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="border-2 border-primary/50 px-2 py-1 flex items-center gap-2">
          <div className="w-2 h-2 bg-accent animate-pulse"></div>
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            SISTEMA ATIVO
          </span>
        </div>
      </div>
    </div>
  );
};
