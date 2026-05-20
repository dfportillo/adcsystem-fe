import axios, { type InternalAxiosRequestConfig } from 'axios'

export const axiosInstance = axios.create({
    baseURL:'http://admin.localhost:8000',
    withCredentials:true
})

axiosInstance.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})