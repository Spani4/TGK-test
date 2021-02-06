import axios from 'axios';

const BASE_URL = 'http://aspt.tgc2-energo.ru';

function getToken() {
    return localStorage.getItem('access_token');
}

const axiosTGK = axios.create({
    baseURL: BASE_URL,
});

const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
})

export { axiosTGK as axios, axiosAuth };