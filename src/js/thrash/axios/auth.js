import axios from '~/js/utils/axios';

// import store from '~/store';

function getToken() {
    return localStorage.getItem('access_token');
}

const axiosAuth = axios.create({
    headers: {
        'Authorization': `Bearer${getToken()}`
    }
})

// auth.interceptors.request.use(config => {

//     config.data = { ...config.data, returnSecureToken: true};
//     config.url = new URL(config.baseURL + config.url);
//     config.url.searchParams.set('key', conf.API_KEY);

//     store.dispatch('startLoading');

//     return config;
// }, error => {
//     throw error;
// })

// auth.interceptors.response.use(response => {

//     const user = {
//         id: response.data.localId,
//         email: response.data.email,
//     }
    
//     const jwt = {
//         token: response.data.idToken,
//         expires: Date.now() + response.data.expiresIn * 1000,
//         refreshToken: response.data.refreshToken,
//         user,
//     }

//     localStorage.setItem('jwt', JSON.stringify(jwt));

//     store.commit('SET_USER', user);
    
//     return response;
// });


export default axiosAuth;