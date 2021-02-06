import Vue from 'vue';
import Vuex from 'vuex';
import router from '~/router';
import {axios, axiosAuth} from '~/js/utils/axios.js';
// import axiosAuth from '~/js/utils/axios/auth';

// axios.defaults.baseURL = 'http://aspt.tgc2-energo.ru';


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        loading: false,
        user: null
    },

    actions: {

        // Login: tester123@m.tast
        // Password: ndlkptb

        async signIn({ dispatch, commit }, data) {

            try {
                const response = await axios.post('/token', data);
                localStorage.setItem('access_token', response.data.access_token);
                dispatch('getUser');
            } catch (err) {
                console.error('Authorization failed');
                console.error(err);
            }
        },

        async getUser({commit}) {
            try {
                const response = await axiosAuth.get('/User');
                commit('SET_USER', response.data);
                console.log(response);
                router.replace('/');
            } catch(err) {
                console.error('Failed to get user');
                console.error(err);
            }
        },

        logout({ commit }) {
            localStorage.removeItem('access_token');
            commit('SET_USER', null);
            router.push('/auth')
        },

        startLoading({ commit }) {
            commit('SET_LOADING', true);
        },
        stopLoading({ commit }) {
            commit('SET_LOADING', false);
        },
    },

    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading;
        },

        SET_USER(state, user) {
            state.user = user;
        }
    }
})
