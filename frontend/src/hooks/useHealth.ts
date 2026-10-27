import { useQuery } from '@tanstack/react-query';
import { HealthResponse } from '../types';

const API_BASE = 'http://127.0.0.1:8081/api';

export const useHealth = () => {
  return useQuery<HealthResponse & { latency: string }>({
    queryKey: ['health'],
    queryFn: async () => {
      const start = performance.now();
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('API Offline');
      const data = await res.json();
      const elapsed = (performance.now() - start).toFixed(2);
      return { ...data, latency: `${elapsed}ms` };
    },
    refetchInterval: 10000, // auto poll every 10s
    retry: 1,
  });
};
