<template lang="pug">
    button.btn.btn-danger(
        type="button"
        @click="handleClick"
    ) Remove
</template>

<script>
import { mapActions } from 'vuex';

export default {

    props: {
        contact: Object,
    },

    methods: {
        ...mapActions('contacts', ['removeContact']),

        async handleClick() {
            await this.removeContact(this.contact);
            this.$emit('removed');
        }
    },
}
</script>