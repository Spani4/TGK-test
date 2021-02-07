<template lang="pug">
    .personal-area
        app-header
        .container.pt-4
            .row
                object-list(
                    :objects="objects"
                    :activeObjectId="activeObjectId"
                    @select="selectObject($event)"
                    )
                Indications(
                    v-if="activeObjectId !== false"
                    :object="activeObject"
                    )

</template>

<script>
import AppHeader from '~/vue/components/common/AppHeader.vue';
import ObjectList from '~/vue/components/ObjectList.vue';
import Indications from '~/vue/components/Indications.vue';
import { mapState } from 'vuex';

export default {
    components: {
        AppHeader,
        ObjectList,
        Indications,
    },

    data() {
        return {
            activeObjectId: false,
        }
    },

    methods: {
        selectObject(objId) {
            this.activeObjectId = objId;
        },
        getObjects() {
            return this.objects
        },
    },

    computed: {
        ...mapState(['objects']),

        activeObject() {
            if ( this.activeObjectId === false ) return false
            return this.objects.find(obj => obj.id == this.activeObjectId)
        }
    }
}
</script>