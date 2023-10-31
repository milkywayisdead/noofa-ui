<template>
    <v-list>
        <v-list-item v-for="(item, idx) in items"
            :key="idx"
            @click="selectedItemIdx = idx"
            color="primary"
            variant="plain"
        >
            {{ item }}
        </v-list-item>
    </v-list>
    <v-btn-group>
        <v-btn icon="mdi-plus" @click="emitAdd" />
        <v-btn icon="mdi-pencil"
            :disabled="!editOrDeleteEnabled"
            @click="emitEdit" />
        <v-btn icon="mdi-delete" 
            :disabled="!editOrDeleteEnabled"
            @click="emitDelete" />
    </v-btn-group>
</template>

<script>
export default {
    name: 'ConfItemsList',
    data(){
        return {
            items: [],
            selectedItemIdx: null,
        }
    },
    computed: {
        editOrDeleteEnabled(){
            return this.selectedItemIdx !== null
        },
    },
    emits: [
        'item-add',
        'item-edit',
        'item-delete',
        'mounted',
    ],
    mounted(){
        this.$emit('mounted')
    },
    methods: {
        updateItems(items){
            this.items = items.filter(item => true)
        },
        emitAdd(){
            this.$emit('item-add')
        },
        emitEdit(){
            this.$emit('item-edit', this.selectedItemIdx)
        },
        emitDelete(){
            this.$emit('item-delete', this.selectedItemIdx)
            this.selectedItemIdx = null
        },
    },
}
</script>