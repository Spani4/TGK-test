<template lang="pug">
    .contacts-page.bg-secondary
        app-header
        div АВТОРИЗОВАН
        //- .contacts-page__content.container(
        //-     v-if="!editorEnabled"
        //- )
        //-     .row
        //-         .col-12.col-md-6.col-lg-5.mb-3.mb-md-0
        //-             .text-center.mb-3
        //-                 button.btn.btn-primary.btn-block(
        //-                     type="button"
        //-                     @click="createContact"
        //-                 ) Add new
        //-             contacts-list(
        //-                 v-model="selectedContact"
        //-                 :selectedContact="selectedContact"
        //-             )
        //-         .col-12.col-md-6.col-lg-7.mh-100.overflow-auto
        //-             transition(name="fade-left-slide" mode="out-in")
        //-                 contact-details(
        //-                     v-if="selectedContactExists"
        //-                     :contact="selectedContact"
        //-                     @edit="editContact"
        //-                     @hide="selectedContact = null"
        //-                 )
        //- contact-editor(
        //-     v-else
        //-     :contactToEdit="selectedContact"
        //-     @hide="closeEditor"
        //- )


</template>

<script>
import { mapState } from 'vuex'

import AppHeader from '~/vue/components/common/AppHeader.vue';

export default {
    name: "PersonalArea",

    components: {
        AppHeader,
    },

    data() {
        return {
            editorEnabled: false,
            selectedContact: null,
        }
    },

    methods: {

    },

    computed: {

    }
}
</script>

<style lang="scss">

</style>