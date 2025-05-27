import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { audienceTypeApi, AudienceType, PaginatedResponse, AudienceTypeListParams, ApiError } from '@/lib/api';

export const AUDIENCE_TYPE_KEYS = {
  all: ['audienceTypes'] as const,
  list: (params?: AudienceTypeListParams) => ['audienceTypes', 'list', params] as const,
  allAudienceTypes: () => ['audienceTypes', 'all'] as const,
};

export interface UseAudienceTypesOptions extends Omit<UseQueryOptions<PaginatedResponse<AudienceType>, ApiError>, 'queryKey' | 'queryFn'> {
  params?: AudienceTypeListParams;
}

export interface UseAllAudienceTypesOptions extends Omit<UseQueryOptions<AudienceType[], ApiError>, 'queryKey' | 'queryFn'> {}

export function useAudienceTypes(options: UseAudienceTypesOptions = {}) {
  const { params, ...queryOptions } = options;
  
  return useQuery({
    queryKey: AUDIENCE_TYPE_KEYS.list(params),
    queryFn: () => audienceTypeApi.list(params),
    ...queryOptions,
  });
}

export function useAllAudienceTypes(options: UseAllAudienceTypesOptions = {}) {
  return useQuery({
    queryKey: AUDIENCE_TYPE_KEYS.allAudienceTypes(),
    queryFn: () => audienceTypeApi.getAll(),
    ...options,
  });
}

// Transform audience types to the format expected by the FilterSelect component
export function useAudienceTypesForFilter(options: UseAllAudienceTypesOptions = {}) {
  const query = useAllAudienceTypes(options);
  
  const transformedData = query.data?.map(audienceType => ({
    value: audienceType.id.toString(),
    label: audienceType.name,
  }));

  return {
    ...query,
    data: transformedData,
  };
} 