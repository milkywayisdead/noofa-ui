<template>
    <v-list-item @dblclick="emitSelected">
        {{ label || '<empty>' }}
    </v-list-item>
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
        itemProps: {
            type: Object,
        },
        itemType: {
            type: String,
        },
    },
    emits: ['profile-item-selected'],
    methods: {
        emitSelected(){
            this.$emit('profile-item-selected', {
                type: this.itemType,
                props: this.itemProps,
            })
        },
    },
}
</script>