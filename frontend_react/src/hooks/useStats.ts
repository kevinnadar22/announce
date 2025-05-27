import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsApi, Stats, ApiError } from '@/lib/api';

export const STATS_KEYS = {
  all: ['stats'] as const,
  get: () => ['stats', 'get'] as const,
};

export interface UseStatsOptions extends Omit<UseQueryOptions<Stats, ApiError>, 'queryKey' | 'queryFn'> {}

export function useStats(options: UseStatsOptions = {}) {
  return useQuery({
    queryKey: STATS_KEYS.get(),
    queryFn: () => statsApi.get(),
    staleTime: 10 * 60 * 1000, // 10 minutes (stats don't change often)
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
} 