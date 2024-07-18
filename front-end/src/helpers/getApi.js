import axios from 'axios';
import store from '../store/store'

const apiClient = axios.create ({
    baseURL: 'http://localhost:3001/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

export const getProfile = async () => {
    try {
        const response = await apiClient.get('/profile')
        return response.data;
    }catch (error) {
        throw error;
    }
}