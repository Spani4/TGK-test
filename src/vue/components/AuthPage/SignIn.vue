<template lang="pug">
    .sign-in
        form#signIn
            .form-group
                label.d-block E-mail
                    input.form-control(
                        type="email"
                        name="username"
                        v-focus
                        v-model.trim="$v.email.$model"
                    )
                .text-danger(v-if="showErrors")
                    small.d-block(
                        v-if="!$v.email.email"
                    ) Email некорректный
                    small.d-block(
                        v-if="!$v.email.required"
                    ) Введите Email
                    small.d-block(
                        v-if="!$v.email.max"
                    ) Email некорректный

            .form-group
                label.d-block Пароль
                    input.form-control(
                        type="password"
                        name="password"
                        v-model="$v.password.$model"
                    )
                .text-danger(v-if="showErrors")
                    small.d-block(
                        v-if="!$v.password.max"
                    ) Пароль слишком длинный
                    small.d-block(
                        v-if="!$v.password.required"
                    ) Введите пароль
                    small.d-block(
                        v-if="!$v.password.min"
                    ) Пароль слишком короткий

            slot(name="autherror")

            .text-right
                button.btn.btn-primary(
                    type="button"
                    @click="submit"
                ) Войти
</template>


<script>
import { mapActions } from 'vuex';

import validations from '~/js/utils/validations';

export default {
    name: "SignIn",

    data() {
        return {
            email: 'tester123@m.tast',
            password: 'ndlkptb',
            showErrors: false,
        }
    },

    methods: {
        ...mapActions(['signIn']),

        submit() {

            if ( this.$v.$invalid ) {
                this.showErrors = true;
                return
            }

            const data = {
                username: this.email,
                password: this.password
            }

            this.signIn(new FormData(signIn)).catch(err => {
                this.$emit('authError', err)
            });;
        }
    },

    validations: {
        email: validations.email,
        password: validations.password,
    },

    mounted() {
        this.$emit('mounted');
    }
}
</script>
