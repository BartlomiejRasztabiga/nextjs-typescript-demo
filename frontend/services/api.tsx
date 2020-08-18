import Axios from "axios";
import Router from 'next/router';

const url = process.env.NEXT_PUBLIC_API_URL

const api = Axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


// api.interceptors.response.use(response => response, error => {
//     if (error.response.status === 401) {
//         Router.push('/login')
//     } else {
//         return Promise.reject(error);
//     }
// });

export const addBearerToken = (token: string) => {
    api.defaults.headers.Authorization = `Bearer ${token}`
}
export const removeBearerToken = () => {
    delete api.defaults.headers.Authorization;
}

export default api;