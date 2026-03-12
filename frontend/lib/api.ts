import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('tripstory-auth');
    if (stored) {
      try {
        const { state } = JSON.parse(stored);
        if (state?.token) config.headers.Authorization = `Bearer ${state.token}`;
      } catch {}
    }
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('tripstory-auth');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// ── API methods ──────────────────────────────────────────

export const authApi = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', data).then(r => r.data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data).then(r => r.data),
  getProfile: () => api.get('/auth/profile').then(r => r.data),
  updateProfile: (data: any) => api.put('/auth/profile', data).then(r => r.data),
};

export const tripsApi = {
  create: (data: any) => api.post('/trips', data).then(r => r.data),
  getAll: (params?: any) => api.get('/trips', { params }).then(r => r.data),
  getOne: (id: string) => api.get(`/trips/${id}`).then(r => r.data),
  update: (id: string, data: any) => api.put(`/trips/${id}`, data).then(r => r.data),
  delete: (id: string) => api.delete(`/trips/${id}`),
  getBudget: (id: string) => api.get(`/trips/${id}/budget`).then(r => r.data),
};

export const storiesApi = {
  create: (data: any) => api.post('/stories', data).then(r => r.data),
  getAll: (params?: any) => api.get('/stories', { params }).then(r => r.data),
  getOne: (id: string) => api.get(`/stories/${id}`).then(r => r.data),
  like: (id: string) => api.post(`/stories/${id}/like`).then(r => r.data),
  comment: (id: string, content: string) => api.post(`/stories/${id}/comments`, { content }).then(r => r.data),
  delete: (id: string) => api.delete(`/stories/${id}`),
};

export const expensesApi = {
  add: (data: any) => api.post('/expenses', data).then(r => r.data),
  getByTrip: (tripId: string) => api.get(`/expenses/${tripId}`).then(r => r.data),
  update: (id: string, data: any) => api.put(`/expenses/${id}`, data).then(r => r.data),
  delete: (id: string) => api.delete(`/expenses/${id}`),
};

export const usersApi = {
  getStats: () => api.get('/users/stats').then(r => r.data),
  getByUsername: (username: string) => api.get(`/users/${username}`).then(r => r.data),
  follow: (id: string) => api.post(`/users/${id}/follow`).then(r => r.data),
};
