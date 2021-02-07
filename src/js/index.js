import "~/scss/index.scss";

import Vue from 'vue'
import Vuelidate from 'vuelidate';

import store from '~/store';
import router from '~/router';
import App from '~/vue/App.vue';

Vue.use(Vuelidate);

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

store.dispatch('autologin');

const el = document.getElementById('app');

new Vue({

    name: 'TGK',
    el,
    store,
    router,
    render: h => h(App),
})
