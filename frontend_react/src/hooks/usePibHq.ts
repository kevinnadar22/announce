import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { pibHqApi, ApiError } from '@/lib/api';

export const PIB_HQ_KEYS = {
  all: ['pibHq'] as const,
  allPibHq: () => ['pibHq', 'all'] as const,
};

export interface UseAllPibHqOptions extends Omit<UseQueryOptions<string[], ApiError>, 'queryKey' | 'queryFn'> {}

export function useAllPibHq(options: UseAllPibHqOptions = {}) {
  return useQuery({
    queryKey: PIB_HQ_KEYS.allPibHq(),
    queryFn: () => pibHqApi.getAll(),
    ...options,
  });
}

// Transform PIB HQ data to the format expected by the FilterSelect component
export function usePibHqForFilter(options: UseAllPibHqOptions = {}) {
  const query = useAllPibHq(options);
  
  const transformedData = query.data?.map(location => ({
    value: location,
    label: location,
  }));

  return {
    ...query,
    data: transformedData,
  };
} 