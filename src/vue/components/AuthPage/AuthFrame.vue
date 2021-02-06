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
// import SignUp from "~/vue/components/AuthPage/SignUp.vue";


export default {
    name: "AuthFrame",
    components: {
        SignIn,
        // SignUp
    },

    data() {
        return {
            authError: false,
        }
    },

    computed: {
        // translatedAuthError() {

        //     switch ( this.authError ) {
        //         case 'EMAIL_EXISTS': return 'The email address is already in use.'
        //         case 'TOO_MANY_ATTEMPTS_TRY_LATER': return 'We have blocked all requests from this device due to unusual activity. Try again later.'
        //         case 'EMAIL_NOT_FOUND': return 'There is no user record corresponding to this identifier.'
        //         case 'INVALID_PASSWORD': return 'The password is invalid.'
        //         case 'USER_DISABLED': return 'The user account has been disabled by an administrator.'
        //         default: return 'Authorization error';
        //     }
        // }
    },    
}
</script>