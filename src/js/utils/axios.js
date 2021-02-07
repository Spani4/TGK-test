import axios from 'axios';

const BASE_URL = 'http://aspt.tgc2-energo.ru';

const getToken = () => {
    return localStorage.getItem('access_token');
}

const axiosTGK = axios.create({
    baseURL: BASE_URL,
});

const axiosAuth = axios.create({
    baseURL: BASE_URL,
})

axiosAuth.interceptors.request.use(function(config) {

    config.headers = {
        'Authorization': `Bearer ${getToken()}`,
        ...config.headers
    }
    return config
}, function(err) {
    return Promise.reject(error);
});

export { axiosTGK as axios, axiosAuth };