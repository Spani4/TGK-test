<template lang="pug">
    .loader(v-if="loading")
        .spinner-border.text-primary
</template>

<script>
import { mapState } from 'vuex';

export default {

    computed: {
        ...mapState(['loading']),
    }
}
</script>