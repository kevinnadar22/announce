const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not defined');
}

export interface Category {
  id: number;
  name: string;
}

export interface Ministry {
  id: number;
  name: string;
}

export interface AudienceType {
  id: number;
  name: string;
}

export interface Language {
  choice: string;
  label: string;
}

export interface Stats {
  press_releases: number;
  ministries: number;
  languages: number;
}

export interface PibHqResponse {
  pib_hq: string[];
}

export interface PressRelease {
  id: number;
  title: string;
  original_text: string;
  source_url: string;
  date_published: string;
  pib_hq: string;
  ministry: number;
  audience_type: number[];
  category: number[];
  created_at: string;
  updated_at: string;
  available_languages: string[];
  description: string;
  ministry_name: string;
  audience_type_names: string[];
  category_names: string[];
}

export interface TranslatedText {
  id: number;
  press_release: number;
  press_release_title: string;
  language: string;
  language_display: string;
  text_type: 'summary' | 'simplified' | 'original' | 'keypoints' | 'oversimplified';
  content: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface TranslatedTextListParams {
  language?: string;
  page?: number;
  press_release?: number;
  text_type?: string;
}

export interface PressReleaseListParams {
  audience_type?: number;
  audience_type_name?: string;
  category?: number;
  category_name?: string;
  date_published?: string;
  date_published__gte?: string;
  date_published__lte?: string;
  date_published_max?: string;
  date_published_min?: string;
  has_translation_language?: string[];
  id?: number;
  language?: string;
  ministry?: number;
  ministry_name?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  pib_hq?: string;
  search?: string;
  source_url?: string;
  title?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CategoryListParams {
  name?: string;
  page?: number;
}

export interface MinistryListParams {
  name?: string;
  page?: number;
}

export interface AudienceTypeListParams {
  name?: string;
  page?: number;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        response
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors or other fetch failures
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
}

export const categoryApi = {
  list: async (params: CategoryListParams = {}): Promise<PaginatedResponse<Category>> => {
    const searchParams = new URLSearchParams();
    
    if (params.name) {
      searchParams.append('name', params.name);
    }
    
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = `/category/${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<PaginatedResponse<Category>>(endpoint);
  },

  getAll: async (): Promise<Category[]> => {
    // Fetch all categories by handling pagination
    let allCategories: Category[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await categoryApi.list({ page });
      allCategories = [...allCategories, ...response.results];
      
      hasMore = response.next !== null;
      page++;
    }

    return allCategories;
  },
};

export const ministryApi = {
  list: async (params: MinistryListParams = {}): Promise<PaginatedResponse<Ministry>> => {
    const searchParams = new URLSearchParams();
    
    if (params.name) {
      searchParams.append('name', params.name);
    }
    
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = `/ministry/${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<PaginatedResponse<Ministry>>(endpoint);
  },

  getAll: async (): Promise<Ministry[]> => {
    // Fetch all ministries by handling pagination
    let allMinistries: Ministry[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await ministryApi.list({ page });
      allMinistries = [...allMinistries, ...response.results];
      
      hasMore = response.next !== null;
      page++;
    }

    return allMinistries;
  },
};

export const audienceTypeApi = {
  list: async (params: AudienceTypeListParams = {}): Promise<PaginatedResponse<AudienceType>> => {
    const searchParams = new URLSearchParams();
    
    if (params.name) {
      searchParams.append('name', params.name);
    }
    
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = `/audience-type/${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<PaginatedResponse<AudienceType>>(endpoint);
  },

  getAll: async (): Promise<AudienceType[]> => {
    // Fetch all audience types by handling pagination
    let allAudienceTypes: AudienceType[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await audienceTypeApi.list({ page });
      allAudienceTypes = [...allAudienceTypes, ...response.results];
      
      hasMore = response.next !== null;
      page++;
    }

    return allAudienceTypes;
  },
};

export const languageApi = {
  getAll: async (): Promise<Language[]> => {
    return apiRequest<Language[]>('/languages/');
  },
};

export const pibHqApi = {
  getAll: async (): Promise<string[]> => {
    const response = await apiRequest<PibHqResponse>('/pib-hq/');
    return response.pib_hq;
  },
};

export const pressReleaseApi = {
  list: async (params: PressReleaseListParams = {}): Promise<PaginatedResponse<PressRelease>> => {
    const searchParams = new URLSearchParams();
    
    // Add all possible parameters to the search params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          // For array parameters like has_translation_language
          value.forEach(item => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/press-release/${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<PaginatedResponse<PressRelease>>(endpoint);
  },

  get: async (id: number, language?: string): Promise<PressRelease> => {
    const searchParams = new URLSearchParams();
    if (language) {
      searchParams.append('language', language);
    }
    
    const queryString = searchParams.toString();
    const endpoint = `/press-release/${id}/${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<PressRelease>(endpoint);
  },
};

export const statsApi = {
  get: async (): Promise<Stats> => {
    return apiRequest<Stats>('/stats/');
  },
};

export const translatedTextApi = {
  list: async (params: TranslatedTextListParams = {}): Promise<PaginatedResponse<TranslatedText>> => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/translated-text/${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<PaginatedResponse<TranslatedText>>(endpoint);
  },
};

export { ApiError }; 