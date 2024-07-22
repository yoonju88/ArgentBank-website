import axios from 'axios';
import store from '../store/store'

/* 저장된 토큰 사용하여 프로필 페이지와 같이 보호된 페이지에 접근 할때  인증에 사용 */

const apiClient = axios.create ({
    baseURL: 'http://localhost:3001/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})
/* 헤더에 토큰 추가하는 인터셉터  */
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
    }, (error) => {
        return Promise.reject(error)
    }
)
/* bring the information from profile */
export const getProfile = async () => {
    try {
        const response = await apiClient.get('/profile')
        return response.data;
    }catch (error) {
        throw error;
    }
}