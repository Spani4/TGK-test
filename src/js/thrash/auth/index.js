import axios from 'axios';
// import * as axios from '~/js/utils/axios/index';
import router from '~/router';
axios.defaults.baseURL = 'http://aspt.tgc2-energo.ru';



export default {

    namespaced: true,
    
    state: {},

    actions: {

        // Login: tester123@m.tast
        // Password: ndlkptb

        async signIn({ dispatch }, data) {

            axios.post('/token', data)
                .then(data => {
                    console.log(data);
                });

            // try {
            //     await axios.auth.post('/accounts:signInWithPassword', data);
            //     await dispatch('contacts/fetchContacts', null, { root: true });
            //     router.replace('/');
            // } catch (err) {
            //     if (err.response && err.response.data) throw err.response.data.error.message;
            //     else console.dir(err);
            // } finally {
            //     dispatch('stopLoading', null, { root: true })
            // }
        },

        async autoLogin({ dispatch, commit }) {
            
            try {
                const user = JSON.parse(localStorage.getItem('jwt')).user;
                commit('SET_USER', user, { root: true });
                await dispatch('contacts/fetchContacts', null, { root: true });
            } catch(err) {
                console.warn('Autologin failed');
            } finally {
                dispatch('stopLoading', null, { root: true })
            }
        },

        logout({ commit }) {
            commit('SET_USER', null, { root: true });
            commit('contacts/SET_CONTACTS', [], { root: true });
            localStorage.removeItem('jwt');
            router.replace('/auth');
        },
    },

    mutations: {},

    getters: {}
}