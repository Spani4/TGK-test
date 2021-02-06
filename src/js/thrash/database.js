import axios from 'axios';

import store from '~/store';
import * as conf from './config';
import refresher from './refresher';

const database = axios.create({
    baseURL: conf.databaseURL,
})

database.interceptors.request.use(async config => {

    let jwt = JSON.parse(localStorage.getItem('jwt'));
    const userId = store.state.user.id;

    if ( jwt.expires < Date.now() ) {
        const refresherResponse = await refresher.post();
        jwt = refresherResponse.data;
    }

    config.baseURL += `/users/${userId}`;
    config.url = new URL(config.baseURL + config.url);
    config.url.searchParams.set('auth', jwt.token);

    store.dispatch('startLoading');

    return config;
})

export default database;