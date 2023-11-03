<template>
    <v-list density="compact" class="pl-4">
        <v-list-subheader class="cursor-default prevent-select">
            <v-icon :icon="statusIcon" @click="expanded = !expanded" />
            <v-icon :icon="icon" />
            <span :id="itemId" 
                @click="reSelect"
                class="text-body-2"
                style="margin-left: 4px;"
                @contextmenu.prevent="contextMenu">
                {{ subheader }}
            </span>
        </v-list-subheader>
        <slot v-if="expanded" name="items"></slot>

        <profile-tree-leaf v-for="item in children" :key="item.id"
            :label="item.name" 
            :item-props="item" 
            :item-type="itemType"
            @profile-item-selected="emitSelected" />

    </v-list>
</template>

<script>
import ProfileTreeLeaf from './ProfileTreeLeaf.vue'
import ctxMenuMixin from '@/utils/mixins/ctxmenu.js'

export default {
    name: 'ProfileTreeBranch',
    mixins: [ctxMenuMixin, ],
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
        },
        itemId(){
            return `${this.itemType}-branch`
        },
    },
    emits: ['profile-item-selected'],
    methods: {
        emitSelected(itemProps){
            this.$emit('profile-item-selected', itemProps)
        },
        reSelect(){
            const cls = 'selected-profile-tree-item'
            const s = document.querySelector(`#profile-tree .${cls}`)
            if(s){
                s.classList.remove(cls)
            }
            const _this = document.getElementById(this.itemId)
            _this.classList.add(cls)
        },
        beforeOnClick(){
            this.reSelect()
        },
    },
    components: {
        ProfileTreeLeaf,
    },
}
</script>