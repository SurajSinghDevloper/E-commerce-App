import axios from 'axios'
import { api } from '../urlConfig'
import store from '../store'
import { authConstant } from '../actions/constant';
const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

// // axiosInstance.interceptors.request.use((req) => {
// //     const { auth } = store.getState();
// //     if (auth.token) {
// //         req.headers.Authorization = `Bearer ${auth.token}`
// //     }
// //     return req;
// // });

// axiosInstance.interceptors.request.use((res) => {
//     return res;
// }, (error) => {
//     console.log("👉👉 ~~ file: axios.js:20 ~~ axiosInstance.interceptors.request.use ~~ error:", error.response);
//     const { status } = error.response
//     if (status === 500) {
//         localStorage.clear();
//         store.dispatch({ type: authConstant.LOGOUT_SUCCESS })
//     }
//     return Promise.reject(error);

// })

export default axiosInstance;