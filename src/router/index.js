import Vue from 'vue'
// import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';

import AuthPage from '~/vue/views/AuthPage.vue'
// import PersonalArea from '~/vue/views/PersonalArea.vue'
import Profile from '~/vue/views/Profile.vue'
import Objects from '~/vue/views/Objects.vue'

import store from '~/store';

Vue.use(VueRouter);

const routes = [
    { path: '/auth', component: AuthPage },
    { path: '/', redirect: Profile },
    { path: '/profile', component: Profile },
    { path: '/objects', component: Objects },

    // {
    //     path: '/',
    //     component: PersonalArea,
    //     beforeEnter(to, from, next) {
    //         if ( store.state.user ) {
    //             next();
    //         } else {
    //             next('/auth');
    //         }
    //     }
    // }
]


export default new VueRouter({ mode: 'history', routes });