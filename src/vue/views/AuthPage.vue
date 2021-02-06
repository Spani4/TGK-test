<template lang="pug">
    .auth-page.bg-light
        .container
            .row
                .col.col-md-8.col-lg-6.mx-auto 
                    auth-frame
</template>

<script>
import AuthFrame from "~/vue/components/AuthPage/AuthFrame.vue";

export default {
    name: "AuthPage",
    components: {
        AuthFrame,
    },
}
</script>

<style lang="scss">

</style>