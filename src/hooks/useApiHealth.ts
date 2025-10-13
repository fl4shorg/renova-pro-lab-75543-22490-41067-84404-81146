import { useState, useEffect } from 'react';

export type HealthStatus = 'online' | 'offline' | 'checking';

export const useApiHealth = (serverUrl: string, endpointPath: string) => {
  const [status, setStatus] = useState<HealthStatus>('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${serverUrl}${endpointPath}`, {
          method: 'HEAD',
          signal: controller.signal,
        }).catch(() => null);

        clearTimeout(timeoutId);

        if (response && response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, [serverUrl, endpointPath]);

  return status;
};
