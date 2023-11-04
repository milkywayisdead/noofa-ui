<template>
    <v-list-item :ripple="false"
        class="cursor-default prevent-select"
        style="min-height:fit-content!important;max-width:fit-content!important;padding:0px!important;padding-top:4px;padding-left:24px;">
        <span style="margin:1px"
            :id="itemId"
            @click="reSelect"
            @dblclick="emitSelected"
            @contextmenu.prevent="contextMenu">
            {{ label || '<empty>' }}
        </span>
    </v-list-item>
</template>

<script>
import ctxMenuMixin from '@/utils/mixins/ctxmenu.js'

export default {
    name: 'ProfileTreeLeaf',
    mixins: [ctxMenuMixin, ],
    data(){
        return {
            useCustomCtxmenuItems: true,
            customCtxmenuItems: [
                {
                    title: this.locale.actions.edit,
                    onclick: this.emitSelected,
                },
                {
                    title: this.locale.actions.delete,
                    onclick: this.emitDelete,
                },
            ],
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
    computed: {
        itemId(){
            const id = this.itemProps.contextualId || this.itemProps.id
            return `pt-item${id}`
        },
    },
    emits: ['profile-item-selected', 'profile-item-delete'],
    methods: {
        emitSelected(){
            this.$emit('profile-item-selected', {
                type: this.itemType,
                props: this.itemProps,
            })
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
            this.ctxmenu().close()
            this.reSelect()
        },
        emitDelete(){
            this.$emit('profile-item-delete', {
                type: this.itemType,
                props: this.itemProps,
            })
        },
    },
}
</script>