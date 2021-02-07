<template lang="pug">
    .col-md-6
        h2.mb-4 Объекты учета
        .nav.nav-tabs.flex-column.border-bottom-0
            .nav-link.text-center.d-block.mb-2.border-secondary.rounded-sm.crp(
                v-for="object in objects"
                :key="object.id"
                :class="{ 'bg-primary text-white': activeObjectId == object.id }"
                @click="$emit('select', object.id)"
            ) {{ object.pointName }}
</template>

<script>
export default {
    props: ['objects', 'activeObjectId']
}
</script>
