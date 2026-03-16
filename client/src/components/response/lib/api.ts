// API client for the response module.
// Connects to the backend server for feedback and response management.

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export type Response = {
  adminName: string;
  message: string;
  date: string;
};

export type Feedback = {
  id: number;
  studentName: string;
  rating: number;
  ratingLabel: string;
  comment: string;
  course: string;
  date: string;
  status: 'replied' | 'pending';
  response?: Response | null;
};

export type Stats = {
  total: number;
  replied: number;
  pending: number;
  avgRating: number;
};

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

// Helper function for API calls with retry logic
async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`📡 API Call (Attempt ${attempt}/${MAX_RETRIES}): ${API_BASE_URL}${url}`);
      
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      
      console.log(`✅ API Call Success: ${url}`);
      return result.data as T;
    } catch (error) {
      lastError = error;
      console.error(`⚠️ Attempt ${attempt} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
        console.log(`🔄 Retrying in ${RETRY_DELAY}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  console.error('❌ API call failed after all retries:', lastError);
  throw lastError;
}

export async function fetchStats(): Promise<Stats> {
  try {
    return await apiCall<Stats>('/feedback/stats');
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    throw error;
  }
}

export async function fetchFeedbacks(filter: 'all' | 'replied' | 'pending' = 'all', search = ''): Promise<Feedback[]> {
  try {
    const params = new URLSearchParams();
    if (filter !== 'all') params.append('filter', filter);
    if (search.trim()) params.append('search', search);
    
    const queryString = params.toString();
    const url = `/feedback${queryString ? `?${queryString}` : ''}`;
    
    return await apiCall<Feedback[]>(url);
  } catch (error) {
    console.error('Failed to fetch feedbacks:', error);
    throw error;
  }
}

export async function submitResponse(id: number, message: string): Promise<void> {
  try {
    await apiCall<void>(`/response/feedback/${id}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  } catch (error) {
    console.error('Failed to submit response:', error);
    throw error;
  }
}

export default {};
