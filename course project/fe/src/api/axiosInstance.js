import axios from "axios";
import { logout } from "../redux/slice/authenticate/action";

let store

export const injectStore = (_store) => {
    store = _store;
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 40000
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

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { status } = error.response

        if (status === 401) {
             store.dispatch(logout())
             return Promise.reject(error)
        }

        return Promise.reject(error);
    }
)

export default axiosInstance

