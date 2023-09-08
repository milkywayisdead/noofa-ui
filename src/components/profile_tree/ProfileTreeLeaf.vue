<template>
    <v-list-item>{{ label }}</v-list-item>
</template>

<script>
export default {
    name: 'ProfileTreeLeaf',
    data(){
        return {
        }
    },
    props: {
        label: {
            type: String,
            default: '',
        },
    },
}
</script>