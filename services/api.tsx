import Axios from "axios";
import Router from 'next/router';

let urls = {
    test: `http://localhost:3000/`,
    development: 'http://localhost:3000/',
    production: 'https://your-production-url.com/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        Router.push('/login')
    } else {
        return Promise.reject(error);
    }
});

export const addBearerToken = (token: string) => {
    api.defaults.headers.Authorization = `Bearer ${token}`
}
export const removeBearerToken = () => {
    delete api.defaults.headers.Authorization;
}

export default api;