<template lang="pug">
    transition(name="fade-left-slide" mode="out-in")
        .contact-details(
            :key="contact.id"
        )

            h1.mb-3 {{ contact.name }}

            .mb-3
                h3 Phones:
                .row
                    template(
                        v-for="phone in contact.phones"
                    )
                        .col-6 {{ phone.description }}
                        .col-6 {{ phone.number }}

            .mb-3(v-if="contact.address.length")
                h3 Address
                div {{ contact.address }}

            .mb-3(v-if="contact.details.length")
                h3 Details
                div {{ contact.details }}

            .flex-grow-1

            .container.pt-2
                .row.w-100.mx-auto
                    .btn-group.col
                        button.col-4.btn.btn-primary(
                            type="button"
                            @click="$emit('edit')"
                        ) Edit
                        button.btn.btn-light(
                            type="button"
                            @click="$emit('hide')"
                        ) Hide
                        remove-btn(
                            :contact="contact"
                            @removed="$emit('hide')"
                        )

</template>

<script>
import RemoveBtn from './RemoveBtn.vue';

export default {

    components: {
        RemoveBtn,
    },

    props: {
        contact: Object,
    },

    computed: {

        additionalPhones() {
            return this.contact.phones.filter( (phone, index) => index !== 0 );
        },
    },
}
</script>