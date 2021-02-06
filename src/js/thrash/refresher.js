import axios from 'axios';

import * as conf from './config';


const refresher = axios.create({
    baseURL: conf.refresherURL
})

refresher.interceptors.request.use(config => {

    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const refreshToken = jwt.refreshToken;

    config.url = new URL(config.baseURL);
    config.url.searchParams.set('key', conf.API_KEY);
    
    const data = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    };
    
    config.data = data;

    return config;
})

refresher.interceptors.response.use(response => {
    
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    
    jwt.token = response.data.access_token,
    jwt.expires = Date.now() + (response.data.expires_in) * 1000,
    jwt.refreshToken = response.data.refresh_token,

    localStorage.setItem('jwt', JSON.stringify(jwt));
    
    response.data = jwt;

    return response;
});


export default refresher;