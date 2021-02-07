<template lang="pug">
    .personal-area
        app-header
        .container.pt-4
            h2.mb-4 Информация о пользователе
            table(v-if="user")
                tr
                    th ФИО:
                    td.pl-4 {{ user.fullName || '' }}
                tr
                    th Логин:
                    td.pl-4 {{ user.login || ''}}

</template>

<script>
import { mapState } from 'vuex';
import AppHeader from '~/vue/components/common/AppHeader.vue';

export default {
    components: {
        AppHeader,
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>