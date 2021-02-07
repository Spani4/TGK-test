<template lang="pug">
    header.header
        .container
            .nav.d-flex.align-content-center.text-white
                router-link.nav-link.text-white.p-3(to="/profile") Пользователь
                router-link.nav-link.text-white.p-3(to="/objects") Объекты учета
                .flex-grow-1
                a.nav-link.text-white.p-3(
                    href="#"
                    @click.prevent="logout"
                ) Выйти
</template>


<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    },
}
</script>

<style lang="scss" scoped>
.nav-link {
    font-weight: bold;
}
</style>
