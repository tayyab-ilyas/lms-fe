import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (userData) => api.post('/api/auth/register', userData),
    login: (credentials) => api.post('/api/auth/login', credentials),
    logout: () => api.post('/api/auth/logout'),
    getCurrentUser: () => api.get('/api/auth/me'),
};

export const leadsAPI = {
    getLeads: (params = {}) => {
        const { page = 1, limit = 20, filters = {} } = params;
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (Object.keys(filters).length > 0) {
            queryParams.append('filters', JSON.stringify(filters));
        }

        return api.get(`/api/leads?${queryParams}`);
    },

    getLead: (id) => api.get(`/api/leads/${id}`),

    createLead: (leadData) => api.post('/api/leads', leadData),

    updateLead: (id, leadData) => api.put(`/api/leads/${id}`, leadData),

    deleteLead: (id) => api.delete(`/api/leads/${id}`),
};

export const healthAPI = {
    check: () => api.get('/health'),
};

export default api;