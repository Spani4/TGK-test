<template lang="pug">
                    
.auth-frame.p-3.shadow.rounded-sm

    .auth-frame__tabs.pb-3
        .text-center Авторизация

    .auth-frame__content.bg-white.border.p-3
        sign-in(
            @authError="authError = $event"
        )
            template(v-slot:autherror)
                .text-danger.py-2(v-if="authError") {{ authError }}

</template>


<script>
import { mapActions } from 'vuex';

import SignIn from "~/vue/components/AuthPage/SignIn.vue";


export default {
    name: "AuthFrame",
    components: {
        SignIn,
    },

    data() {
        return {
            authError: false,
        }
    },

    computed: {},    
}
</script>