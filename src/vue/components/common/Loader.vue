<template lang="pug">
    .loader(
        v-if="loading || !appLoaded"
        :class="{ 'global' : !appLoaded}"
        )
        .spinner-border.text-primary
</template>

<script>
import { mapState } from 'vuex';

export default {

    computed: {
        ...mapState(['loading', 'appLoaded']),
    }
}
</script>