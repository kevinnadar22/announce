import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { languageApi, Language, ApiError } from '@/lib/api';
import { decodeLanguage } from '@/lib/languageMapping';

export const LANGUAGE_KEYS = {
  all: ['languages'] as const,
  allLanguages: () => ['languages', 'all'] as const,
};

export interface UseAllLanguagesOptions extends Omit<UseQueryOptions<Language[], ApiError>, 'queryKey' | 'queryFn'> {}

export function useAllLanguages(options: UseAllLanguagesOptions = {}) {
  return useQuery({
    queryKey: LANGUAGE_KEYS.allLanguages(),
    queryFn: () => languageApi.getAll(),
    ...options,
  });
}

// Transform languages to the format expected by the FilterSelect component
export function useLanguagesForFilter(options: UseAllLanguagesOptions = {}) {
  const query = useAllLanguages(options);
  
  const transformedData = query.data?.map(language => ({
    value: language.choice,
    label: decodeLanguage(language.choice),
  }));

  return {
    ...query,
    data: transformedData,
  };
} 