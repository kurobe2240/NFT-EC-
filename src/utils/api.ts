import { CSRFProtection } from './csrf';
import { validateInput } from './security';

interface APIRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  data?: any;
}

export class SecureAPIClient {
  private static baseURL = process.env.REACT_APP_API_URL || '';

  static async request<T>({ method, endpoint, data }: APIRequestConfig): Promise<T> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRF-Token': CSRFProtection.getToken(),
      'X-Requested-With': 'XMLHttpRequest'
    });

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers,
        credentials: 'include',
        body: data ? JSON.stringify(data) : undefined
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
} 