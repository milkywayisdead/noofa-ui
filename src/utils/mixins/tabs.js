import DeleteConfirmationDialog from '@/components/dialogs/DeleteConfirmationDialog.vue'

const tabMixin = {
    data(){
        return {
            itemGroup: '',
        }
    },
    props: {
        itemProps: {
            type: Object,
        }
    },
    inject: ['locale', 'context', 'api', 'snackbar'],
    emits: ['item-delete', 'enter-loading-state', 'exit-loading-state'],
    methods: {
        emitItemDelete(itemId){
            this.$emit('item-delete', itemId)
        },
        updateItem(item){
            this.api.partialUpdate(this.context.id, this.itemGroup, this.id, item.compile())
                .then(res => {
                    const message = this.locale.messages[`${this.itemGroup}SavedSuccess`]
                    this.snackbar.success(message)
                }).catch(err => {
                    const g = this.itemGroup
                    const key = `errorWhenSaving${g[0].toUpperCase() + g.slice(1)}`
                    const message = this.locale.messages[key]
                    this.snackbar.error(message)
                })
        },
        enterLoadingState(){
            this.$emit('enter-loading-state')
        },
        exitLoadingState(){
            this.$emit('exit-loading-state')
        },
    },
    components: {
        DeleteConfirmationDialog,
    },
}

export {
    tabMixin,
}