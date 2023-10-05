import BaseDialog from '@/components/dialogs/BaseDialog.vue'

const dialogMixin = {
    inject: ['api', 'locale', 'context'],
    methods: {
        open(){
            this.$refs.baseDialog.open()
        }
    },
    components: {
        BaseDialog,
    },
}

const dfConfDialogMixin = {
    data(){
        return {
            dfConfItems: [],
            selectedItemIdx: null,
            mode: 'idle',
            relatedDfProp: '',
        }
    },
    props: {
        dataframeId: {
            type: String,
        },
    },
    mixins: [dialogMixin, ],
    computed: {
        isEditing(){
            return ['add', 'edit'].includes(this.mode)
        },
        dataframes(){
            const otherDfs = Object.values(this.context.dataframes).filter(
                df => df.id !== this.dataframeId
            )
            return otherDfs.map(df => {
                return {
                    value: df.id,
                    text: df.name,
                }
            })
        },
        addButtonIsEnabled(){
            return false
        },
    },
    emits: [
        'items-updated',
    ],
    methods: {
        getItems(){
            return this.dfConfItems
        },
        itemToConf(){
            return {}
        },
        fillConfFields(item){
        },
        handleEdit(itemIdx){
            this.mode = 'edit'
            this.selectedItemIdx = itemIdx
            this.fillConfFields(this.dfConfItems[itemIdx])
        },
        handleDelete(itemIdx){
            this.dfConfItems = this.dfConfItems.filter((item, idx) => idx !== itemIdx)
            this.selectedItemIdx = null
        },
        addItem(){
            this.dfConfItems.push(this.itemToConf())
            this.dfConfItems = this.dfConfItems.filter(item => true)
            this.reset()
        },
        updateItem(){
            this.dfConfItems[this.selectedItemIdx] = this.itemToConf()
            this.dfConfItems = this.dfConfItems.filter(item => true)
            this.reset()
        },
        emitUpdated(){
            this.$emit('items-updated')
        },
        updateItems(items){
            this.dfConfItems = items.filter(item => true)
        },
        getItemsFromContext(){
            this.updateItems(
                this.context.dataframes[this.dataframeId][this.relatedDfProp]
            )
        },
        saveConfAndClose(){
            this.emitUpdated()
            this.$refs.baseDialog.close()
        },
    },
}

export {
    dialogMixin,
    dfConfDialogMixin,
}