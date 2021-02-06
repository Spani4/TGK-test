<template lang="pug">
    div
        router-view
        loader
</template>


<script>
import Loader from '~/vue/components/common/Loader.vue';

export default {

    components: {
        Loader,
    },
}
</script>