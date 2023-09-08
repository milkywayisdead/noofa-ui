<template>
    <v-list density="compact" class="pl-4">
        <v-list-subheader>
            <v-icon :icon="statusIcon" @click="expanded = !expanded" />
            <v-icon :icon="icon" />
            {{ subheader }}
        </v-list-subheader>
        <slot v-if="expanded" name="items"></slot>
        <v-list-item v-for="item in children" :key="item.id">
            <profile-tree-leaf 
                :label="item.name" 
                :item-props="item" 
                :item-type="itemType"
                @profile-item-selected="emitSelected" />
        </v-list-item>
    </v-list>
</template>

<script>
import ProfileTreeLeaf from './ProfileTreeLeaf.vue'

export default {
    name: 'ProfileTreeBranch',
    data(){
        return {
            expanded: false,
        }
    },
    props: {
        subheader: {
            type: String,
            default: '',
        },
        icon: {
            type: String,

        },
        items: {
            type: [Array, Object],
            default: [],
        },
        itemType: {
            type: String,
        },
    },
    inject: ['context', 'locale'],
    computed: {
        children(){
            if(!this.expanded){
                return []
            }
            if(!Array.isArray(this.items)){
                return Object.values(this.items)
            }
            return this.items
        },
        statusIcon(){
            return this.expanded ? 'mdi-minus' : 'mdi-plus'
        }
    },
    emits: ['profile-item-selected'],
    methods: {
        emitSelected(itemProps){
            this.$emit('profile-item-selected', itemProps)
        },
    },
    components: {
        ProfileTreeLeaf,
    },
}
</script>