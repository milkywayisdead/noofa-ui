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
    inject: ['locale', 'context', 'api'],
    emits: ['item-delete'],
    methods: {
        emitItemDelete(itemId){
            this.$emit('item-delete', itemId)
        },
        updateItem(item){
            this.api.partialUpdate(this.context.id, this.itemGroup, this.id, item.compile())
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data)
                    }
                })     
        },
    },
    components: {
        DeleteConfirmationDialog,
    },
}

export {
    tabMixin,
}