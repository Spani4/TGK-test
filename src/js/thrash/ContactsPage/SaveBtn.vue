<template lang="pug">
    button.btn.btn-success(
        type="button"
        :disabled="!contact.name.length"
        @click="handleClick"
    ) Save    
</template>

<script>
import { mapActions } from 'vuex';

export default {

    props: {
        contact: Object,
    },

    methods: {

        ...mapActions('contacts', ['addContact', 'updateContact']),

        async handleClick() {

            this.normalizeContact();

            if ( this.isNew ) {
                await this.addContact(this.contact);
            } else {
                await this.updateContact(this.contact);
            }

            this.$emit('saved');
        },

        normalizeContact() {

            this.contact.phones = this.contact.phones.filter((phone, index) => {

                if ( index === 0 && (!phone.number || !phone.number.length) )
                    phone.number = 'None';
                
                return (index == 0) || (phone.number && phone.number.length);
            });
        }
    },

    computed: {
        isNew() {
            return !Boolean(this.contact.id);
        }
    }
}
</script>