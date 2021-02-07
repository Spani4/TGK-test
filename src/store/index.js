import Vue from 'vue';
import Vuex from 'vuex';
import router from '~/router';
import {axios, axiosAuth} from '~/js/utils/axios.js';



Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        appLoaded: false,
        loading: false,
        user: null,
        objects: [],
        indications: [],
    },

    actions: {

        async signIn({ dispatch, commit }, data) {

            try {
                dispatch('startLoading');
                const response = await axios.post('/token', data);
                localStorage.setItem('access_token', response.data.access_token);
            } catch (err) {
                console.error('Authorization failed');
                console.error(err);
            }
            dispatch('getUser');
        },

        async getUser({ dispatch, commit }) {
            try {
                const response = await axiosAuth.get('/User');
                commit('SET_USER', response.data);
                if ( window.location.pathname != '/profile' ) router.push('/profile');
            } catch(err) {
                console.error('Failed to get user');
                console.error(err);
                dispatch('stopLoading');
                dispatch('logout');
                if ( !state.appLoaded ) commit('APP_LOADED');
            }
            dispatch('getObjects');
        },

        async getObjects({ dispatch, commit }) {
            try {
                const response = await axiosAuth.get('/Points');
                commit('SET_OBJECTS', response.data)
            } catch(err) {
                console.error('failed to get user data');
                console.error(err);
            }
            dispatch('getIndications');
        },

        async getIndications({ state, dispatch, commit }) {
            commit('CLEAR_INDICATIONS');
            state.objects.forEach(async (object) => {
                try {
                    const response = await axiosAuth.get(`/Indication/${object.id}`);
                    const indications = response.data;
                    commit('SET_INDICATIONS', {object, indications});
                    commit('PUSH_INDICATIONS', indications);
                } catch(err) {
                    console.error(`Failed to get object indication id:${object.id}`);
                    console.error(err);
                } finally {
                    dispatch('stopLoading');
                    if ( !state.appLoaded ) commit('APP_LOADED');
                }
            });
        },

        async sendNewIndication({ dispatch, commit }, indicationsData) {
            try {
                dispatch('startLoading');
                await axiosAuth.post('/Indication', indicationsData);
            } catch(err) {
                console.error(`Failed to send object indication id:${indicationsData.ownerId}`);
                console.error(err);
            } finally {
                dispatch('stopLoading');
            }
            dispatch('getIndications');
        },

        async deleteIndication({ dispatch, commit}, indication) {
            try {
                dispatch('startLoading');
                await axiosAuth.delete(`/Indication/${indication.id}`);
            } catch(err) {
                console.error(`Failed to delete object indication id:${indication.id}`);
                console.error(err);
            } finally {
                dispatch('stopLoading');
            }
            dispatch('getIndications');
        },

        async autologin({ dispatch, commit }) {
            if ( !localStorage.getItem('access_token') ) {
                router.replace('/auth');
                commit('APP_LOADED');
                return;
            }
            dispatch('getUser');
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

        APP_LOADED(state) {
            state.appLoaded = true;
        },

        SET_USER(state, user) {
            state.user = user;
        },

        SET_OBJECTS(state, objects) {
            // state.objects = objects;
            state.objects.splice(0, state.objects.length);
            objects.forEach(obj => {
                obj.indications = [];
                state.objects.push(obj);
            });
        },

        SET_INDICATIONS(state, payload) {
            // payload.object.indications = payload.indications;
            payload.object.indications.splice(0,payload.object.indications.length);
            payload.indications.forEach(indication => {
                payload.object.indications.push(indication);
            });
        },

        CLEAR_INDICATIONS(state) {
            state.indications = [];
        },

        PUSH_INDICATIONS(state, indications) {
            state.indications.push(...indications);
        }
    },

    getters: {
        indicationsLength(state) {
            return state.indications.length;
        }
    }
})
