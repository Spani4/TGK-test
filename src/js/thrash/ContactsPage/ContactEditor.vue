<template lang="pug">
    .contact-editor
        form.container.py-3.bg-secondary.text-dark
            .row
                .col.pl-4.mb-3
                    button.btn.btn-outline-primary(
                        type="button"
                        @click="$emit('hide')"
                    ) &larr; Back

            .row.form-group
                label.col-12.col-md-6.col-xl-4
                    h3.mb-1 Contact name
                    input.form-control(
                        v-focus
                        v-model="contact.name"
                    )
                        
            .row.form-group
                label.col-12.col-xl-8
                    h3.mb-1 Address
                    textarea.form-control(
                        v-model.trim="contact.address"
                    )

            .row.form-group
                label.col-12.col-md-6.col-xl-4
                    h3.mb-1 Main phone
                    input.form-control(
                        v-model.trim="contact.phones[0].number"
                    )

            .row.form-group
                h3.col-12.mb-1 Additional phones


                .p-2.w-100.border-bottom(
                    v-for="(phone, index) in additionalPhones"
                )
                    label.col-12.col-sm-5.col-xl-4
                        h5.mb-1 Description               
                        input.form-control(
                            v-model.trim="additionalPhones[index].description"
                        )
                    label.col-12.col-sm-5.col-xl-4
                        h5.mb-1 Phone number
                        input.form-control(
                            v-focus
                            v-model.trim="additionalPhones[index].number"
                        )
                    button.btn.btn-danger.btn-sm(
                        type="button"
                        @click="removePhone(index+1)"
                    ) remove

                .col-12.pt-3
                    button.btn.btn-primary(
                        type="button"
                        @click="addPhone"
                    ) Add phone
                    
            .row.form-group
                label.col-12.col-xl-8
                    h3.mb-1 Details
                    textarea.form-control(
                        v-model.trim="contact.details"
                    )
            
            .row.form-group
                .btn-group.col-12.col-xl-8
                    save-btn(
                        type="button"
                        :contact="contact"
                        @saved="$emit('hide')"
                    ) Save
                    button.btn.btn-light(
                        type="button"
                        @click="$emit('hide')"
                    ) Cancel
                    remove-btn(
                        v-if="contactToEdit"
                        :contact="contactToEdit"
                        @removed="$emit('hide')"
                    )

</template>

<script>
import SaveBtn from './SaveBtn.vue';
import RemoveBtn from './RemoveBtn.vue';

import { mapState } from 'vuex';

export default {

    components: {
        SaveBtn,
        RemoveBtn
    },

    props: {
        contactToEdit: Object,
    },
    
    data() {
        return {
            contact: {
                name: '',
                address: '',
                phones: [{ description: 'Main', number: undefined }],
                details: ''
            }
        }
    },

    computed: {
        ...mapState(['user']),

        additionalPhones() {
            return this.contact.phones.filter( (phone, index) => index !== 0 );
        }
    },

    methods: {

        addPhone() {
            this.contact.phones.push({
                description: 'Mobile',
                number: ''
            });
        },     

        removePhone(index) {
            this.contact.phones = this.contact.phones.filter((phone, i) => index != i);
        },
    },

    mounted() {

        if ( this.contactToEdit ) {
            this.contact = { ...this.contactToEdit };
        }
    }
}
</script>
