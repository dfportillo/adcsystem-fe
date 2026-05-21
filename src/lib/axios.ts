import axios, { type InternalAxiosRequestConfig } from 'axios'

export const customInstace = axios.create({
    baseURL:'http://admin.localhost:8000',
    withCredentials:true
})
export const customAxios = async <T>(config:InternalAxiosRequestConfig|any):Promise<T> => {
    const token = localStorage.getItem('access')
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    const res = await customInstace(config);

    return res.data
}