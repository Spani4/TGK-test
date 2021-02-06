<template lang="pug">
    .contacts-list
        .p-3
            input.form-control(
                type="text"
                placeholder="Search..."
                v-model.trim="filterText"
            )
               
        .contacts-list__item(
            v-for="contact in filteredContacts"
            :key="contact.id"
            :class="{ active: contact == selectedContact }"
            @click="$emit('input', contact)"
        ) {{ contact.name }}

</template>

<script>
import { mapState } from 'vuex';

export default {

    props: {
        selectedContact: Object,
    },

    data() {
        return {
            filterText: '',
        }
    },
    
    computed: {
        ...mapState('contacts', ['contacts']),

        sortedContacts() {
            return this.contacts.sort((a,b) => {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 :-1;
            });
        },

        filteredContacts() {
            return this.sortedContacts.filter(contact => contact.name.toLowerCase().includes(this.filterText.toLowerCase()));
        }
    }
}
</script>