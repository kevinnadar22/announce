import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { categoryApi, Category, PaginatedResponse, CategoryListParams, ApiError } from '@/lib/api';

export const CATEGORY_KEYS = {
  all: ['categories'] as const,
  list: (params?: CategoryListParams) => ['categories', 'list', params] as const,
  allCategories: () => ['categories', 'all'] as const,
};

export interface UseCategoriesOptions extends Omit<UseQueryOptions<PaginatedResponse<Category>, ApiError>, 'queryKey' | 'queryFn'> {
  params?: CategoryListParams;
}

export interface UseAllCategoriesOptions extends Omit<UseQueryOptions<Category[], ApiError>, 'queryKey' | 'queryFn'> {}

export function useCategories(options: UseCategoriesOptions = {}) {
  const { params, ...queryOptions } = options;
  
  return useQuery({
    queryKey: CATEGORY_KEYS.list(params),
    queryFn: () => categoryApi.list(params),
    ...queryOptions,
  });
}

export function useAllCategories(options: UseAllCategoriesOptions = {}) {
  return useQuery({
    queryKey: CATEGORY_KEYS.allCategories(),
    queryFn: () => categoryApi.getAll(),
    ...options,
  });
}

// Transform categories to the format expected by the FilterSelect component
export function useCategoriesForFilter(options: UseAllCategoriesOptions = {}) {
  const query = useAllCategories(options);
  
  const transformedData = query.data?.map(category => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return {
    ...query,
    data: transformedData,
  };
} 