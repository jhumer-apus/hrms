import axios from 'axios';
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

//LOGIC BEFORE REQUEST
// api.interceptors.request.use(

//     async (config) => {

//         let accessToken = Cookies.get('access_token');

//         if (accessToken) {

//             config.headers.Authorization = `Bearer ${accessToken}`;

//         } 
//         // else {

//         //     const refreshToken = Cookies.get('refresh_token');

//         //     if (refreshToken) {

//         //         try {
//         //             const payload = { refresh: refreshToken };
//         //             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/`, payload);
                    
//         //             const { access: newAccessToken, refresh: newRefreshToken } = response.data;
                    
//         //             Cookies.set('access_token', newAccessToken);
//         //             Cookies.set('refresh_token', newRefreshToken);
                    
//         //             config.headers.Authorization = `Bearer ${newAccessToken}`;
                    
//         //         } catch (error) {

//         //             console.error('Token refresh failed:', error);
//         //             // Optionally redirect to login page
//         //             // window.location.href = '/login';
//         //             return Promise.reject(error);
//         //         }
//         //     }
//         // }

//         return config;
//     },
//     (error) => {

//         return Promise.reject(error);

//     }
// );

// //LOGIC AFTER RESPONSE
// api.interceptors.response.use(

//   (response) => {
//     return response;
//   },

//   async function (error) {

//     const originalRequest = error.config;

//     if (error.response.status === 403 && !originalRequest._retry) {

//       originalRequest._retry = true;

//       const resp = await refreshToken();

//       const newAccessToken = resp.response.accessToken;

//       Cookies.set('access_token', newAccessToken)

//       api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

//       return api(originalRequest);
//     }
    
//     return Promise.reject(error);
//   }
// );

// const refreshToken = async () => {

//   try {

//     const res = await api.get("auth/refresh");
//     return res.data;

//   } catch (e) {

//       Cookies.remove('access_token');
//       Cookies.remove('refresh_token');

//   }
// };

export default api;
