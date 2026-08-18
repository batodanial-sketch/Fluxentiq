import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Backwards-compatible mock layer for legacy page queries
export const base44 = {
  get: (url, config) => apiClient.get(url, config).then((res) => res.data),
  post: (url, data, config) => apiClient.post(url, data, config).then((res) => res.data),
  put: (url, data, config) => apiClient.put(url, data, config).then((res) => res.data),
  delete: (url, config) => apiClient.delete(url, config).then((res) => res.data),
  entities: new Proxy(
    {},
    {
      get: (_, entityName) => ({
        find: async (query) => {
          try {
            const res = await apiClient.get(`/entities/${entityName}`, { params: query });
            return res.data;
          } catch {
            return [];
          }
        },
        findById: async (id) => {
          try {
            const res = await apiClient.get(`/entities/${entityName}/${id}`);
            return res.data;
          } catch {
            return null;
          }
        },
        create: (data) => apiClient.post(`/entities/${entityName}`, data).then((r) => r.data),
        update: (id, data) => apiClient.put(`/entities/${entityName}/${id}`, data).then((r) => r.data),
        delete: (id) => apiClient.delete(`/entities/${entityName}/${id}`).then((r) => r.data),
      }),
    }
  ),
  auth: {
    me: () => apiClient.get('/auth/me').then((res) => res.data),
    logout: () => {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    },
  },
};

export default base44;