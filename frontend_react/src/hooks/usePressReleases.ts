import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { pressReleaseApi, translatedTextApi, PressRelease, TranslatedText, PaginatedResponse, PressReleaseListParams, TranslatedTextListParams, ApiError } from '@/lib/api';

export const PRESS_RELEASE_KEYS = {
  all: ['pressReleases'] as const,
  list: (params?: PressReleaseListParams) => ['pressReleases', 'list', params] as const,
  detail: (id: number, language?: string) => ['pressReleases', 'detail', id, language] as const,
};

export const TRANSLATED_TEXT_KEYS = {
  all: ['translatedText'] as const,
  list: (params?: TranslatedTextListParams) => ['translatedText', 'list', params] as const,
};

export interface UsePressReleasesOptions extends Omit<UseQueryOptions<PaginatedResponse<PressRelease>, ApiError>, 'queryKey' | 'queryFn'> {
  params?: PressReleaseListParams;
}

export interface UsePressReleaseOptions extends Omit<UseQueryOptions<PressRelease, ApiError>, 'queryKey' | 'queryFn'> {
  language?: string;
}

export interface UseTranslatedTextOptions extends Omit<UseQueryOptions<PaginatedResponse<TranslatedText>, ApiError>, 'queryKey' | 'queryFn'> {
  params?: TranslatedTextListParams;
}

export function usePressReleases(options: UsePressReleasesOptions = {}) {
  const { params, ...queryOptions } = options;
  
  return useQuery({
    queryKey: PRESS_RELEASE_KEYS.list(params),
    queryFn: () => pressReleaseApi.list(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...queryOptions,
  });
}

export function usePressRelease(id: number, options: UsePressReleaseOptions = {}) {
  const { language, ...queryOptions } = options;
  
  return useQuery({
    queryKey: PRESS_RELEASE_KEYS.detail(id, language),
    queryFn: () => pressReleaseApi.get(id, language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...queryOptions,
  });
}

export function useTranslatedText(options: UseTranslatedTextOptions = {}) {
  const { params, ...queryOptions } = options;
  
  return useQuery({
    queryKey: TRANSLATED_TEXT_KEYS.list(params),
    queryFn: () => translatedTextApi.list(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...queryOptions,
  });
} 