<template lang="pug">
    .col-md-6
        h2 {{ object.pointName }}
        .mb-2 Переданные показания: 
        select.mb-3(v-model="sort")
            option(value="asc") По возрастанию
            option(value="desc") По убыванию
        table.mb-4
            tr(
                v-for="indication in sortedIndications"
                :key="indication.id"
            )
                td.border.border-grey.py-1.px-3 {{ getFormattedDate(indication.period) }}
                th.border.border-grey.text-right.py-1.px-3 {{ indication.value }}
                td
                    button.btn.btn-danger(
                        @click="removeIndication(indication)"
                    )
                        small Удалить
        .mb-2 Отправить показания
        form.form-inline
            input.form-control.mr-2(
                type="text"
                v-model.trim="newIndications"
            )
            button.btn.btn-primary(@click.prevent="sendIndications") Отправить
            small.d-block.mt-2.text-danger.w-100(
                v-if="newIndicationsError"
            ) {{ newIndicationsError }}
</template>


<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['object'],

    data() {
        return {
            newIndications: '',
            newIndicationsError: false,
            sort: 'asc'
        }
    },

    computed: {
        ...mapGetters(['indicationsLength']),

        maxIndications() {
            return Math.max(...this.sortedIndications.map(item => item.value));
        },

        sortedIndications() {
            switch (this.sort) {
                case 'asc': return this.object.indications.sort((a,b) => {
                    let momentA = moment(a.period)
                    let momentB = moment(b.period)
                    return momentA - momentB;
                });
                case 'desc': return this.object.indications.sort((a,b) => {
                    let momentA = moment(a.period)
                    let momentB = moment(b.period)
                    return momentB - momentA;
                });
            }
            // return this.object.indications;
        }
    },

    methods: {
        ...mapActions(['sendNewIndication', 'deleteIndication']),

        getFormattedDate(date) {
            return moment(date).format('DD.MM.YYYY - HH:mm:ss');
        },

        checkIndications() {
            if ( this.newIndications < this.maxIndications ) {
                this.newIndicationsError = 'Показания не могут быть меньше предыдущих'
            } else {
                this.newIndicationsError = false;
            }
        },

        async sendIndications() {
            this.checkIndications();

            if ( !this.newIndicationsError ) {
                const now = new Date();
                await this.sendNewIndication({
                    ownerId: this.object.id,
                    period: moment().format(),
                    value: Number(this.newIndications)
                });
            }
        },

        async removeIndication(indication) {
            await this.deleteIndication(indication);
        },
    },

    watch: {
        newIndications(newVal, oldVal) {
            if ( isNaN(newVal) ) this.newIndications = oldVal;
        },
        object: {
            deep: true,
            handler: function() {
                this.newIndications = this.maxIndications;
            }
        },
        // indicationsLength(newVal) {
        //     console.log(newVal);
        //     this.$forceUpdate();
        // }
    },

    mounted() {
        this.newIndications = this.maxIndications;
    },
}
</script>