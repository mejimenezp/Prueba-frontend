import api from './apiService';

export const login = async (credentials) => {
    try {
        const response = await api.post('/token/', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refresh = async (refreshToken) => {
    try {
        const response = await api.post('/token/refresh/', { refresh: refreshToken });
        return response.data;
    } catch (error) {
        throw error;
    }
};
