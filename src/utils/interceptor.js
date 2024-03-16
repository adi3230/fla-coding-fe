import axios from 'axios';

const HTTP = axios;

// Default URL
HTTP.defaults.baseURL = 'http://localhost:3000';
//HTTP.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

HTTP.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
HTTP.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default HTTP;
