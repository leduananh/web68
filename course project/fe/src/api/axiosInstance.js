import axios from "axios";

let store

export const injectStore = (_store) => {
    store = _store;
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().authenticate.accessToken

        if (accessToken) {
            config.headers.Authorization = accessToken
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance

