
// This file provides a structure for connecting the frontend to your backend

interface ApiOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

// Base API URL - replace with your backend URL
const API_URL = 'https://your-api-url.com/api';

/**
 * Base API call function
 * Use this to connect to your backend API
 */
export async function apiCall<T>({ endpoint, method = 'GET', body, headers = {} }: ApiOptions): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include', // Include cookies for auth
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Call failed:', error);
    throw error;
  }
}

// Authentication-related API calls
export const authApi = {
  login: async (email: string, password: string, role: string) => {
    return apiCall<{ user: any; token: string }>({
      endpoint: '/auth/login',
      method: 'POST',
      body: { email, password, role }
    });
  },
  
  logout: async () => {
    return apiCall<{ success: boolean }>({
      endpoint: '/auth/logout',
      method: 'POST'
    });
  }
};

// Product-related API calls
export const productApi = {
  getProducts: async () => {
    return apiCall<any[]>({
      endpoint: '/products'
    });
  },
  
  getProductByBarcode: async (barcode: string) => {
    return apiCall<any>({
      endpoint: `/products/barcode/${barcode}`
    });
  }
};

// Transaction-related API calls
export const transactionApi = {
  createTransaction: async (transaction: any) => {
    return apiCall<any>({
      endpoint: '/transactions',
      method: 'POST',
      body: transaction
    });
  },
  
  sendReceipt: async (transactionId: string, email?: string, phone?: string) => {
    return apiCall<{ success: boolean }>({
      endpoint: '/transactions/send-receipt',
      method: 'POST',
      body: { transactionId, email, phone }
    });
  }
};

// Customer-related API calls
export const customerApi = {
  getCustomers: async () => {
    return apiCall<any[]>({
      endpoint: '/customers'
    });
  },
  
  createCustomer: async (customer: any) => {
    return apiCall<any>({
      endpoint: '/customers',
      method: 'POST',
      body: customer
    });
  },
  
  updateLoyaltyPoints: async (customerId: string, points: number) => {
    return apiCall<any>({
      endpoint: `/customers/${customerId}/loyalty`,
      method: 'PUT',
      body: { points }
    });
  }
};
