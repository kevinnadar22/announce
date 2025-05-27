import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ministryApi, Ministry, PaginatedResponse, MinistryListParams, ApiError } from '@/lib/api';

export const MINISTRY_KEYS = {
  all: ['ministries'] as const,
  list: (params?: MinistryListParams) => ['ministries', 'list', params] as const,
  allMinistries: () => ['ministries', 'all'] as const,
};

export interface UseMinistriesOptions extends Omit<UseQueryOptions<PaginatedResponse<Ministry>, ApiError>, 'queryKey' | 'queryFn'> {
  params?: MinistryListParams;
}

export interface UseAllMinistriesOptions extends Omit<UseQueryOptions<Ministry[], ApiError>, 'queryKey' | 'queryFn'> {}

export function useMinistries(options: UseMinistriesOptions = {}) {
  const { params, ...queryOptions } = options;
  
  return useQuery({
    queryKey: MINISTRY_KEYS.list(params),
    queryFn: () => ministryApi.list(params),
    ...queryOptions,
  });
}

export function useAllMinistries(options: UseAllMinistriesOptions = {}) {
  return useQuery({
    queryKey: MINISTRY_KEYS.allMinistries(),
    queryFn: () => ministryApi.getAll(),
    ...options,
  });
}

// Transform ministries to the format expected by the FilterSelect component
export function useMinistriesForFilter(options: UseAllMinistriesOptions = {}) {
  const query = useAllMinistries(options);
  
  const transformedData = query.data?.map(ministry => ({
    value: ministry.id.toString(),
    label: ministry.name,
  }));

  return {
    ...query,
    data: transformedData,
  };
} 