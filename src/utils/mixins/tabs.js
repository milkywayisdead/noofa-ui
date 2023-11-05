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
        },
        tabsArea: {
            type: Object,
        },
    },
    inject: ['locale', 'context', 'api', 'snackbar'],
    emits: ['item-delete', 'enter-loading-state', 'exit-loading-state', 'mounted'],
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
        snackbarOnItemBuildError(){
            const g = this.itemGroup[0].toUpperCase() + this.itemGroup.slice(1)
            this.snackbar.error(this.locale.messages[`errorWhenGetting${g}Data`])
        },
        snackbarOnItemBuildSuccess(){
            this.snackbar.success(this.locale.messages[`${this.itemGroup}DataSuccess`])
        },
        updateContainerSize(){
            const rc = document.getElementById(this.rowContainerId)
            const ta = document.getElementById(this.tabsArea.divId)
            console.log(rc,ta)
            if(!rc || !ta) return

            const taRect = ta.getBoundingClientRect()
            const taBottom = taRect.y + taRect.height
            const rcRect = rc.getBoundingClientRect()
            rc.style.height = `${taBottom - 10 - rcRect.y}px`
        },
    },
    computed: {
        rowContainerId(){
            const idProp = this.itemGroup === 'dashboard' ? 'contextualId' : 'id'
            return `r-cont-${this[idProp]}`
        },
    },
    mounted(){
        this.$emit('mounted', this)
        this.updateContainerSize()
    },
    components: {
        DeleteConfirmationDialog,
    },
}

export {
    tabMixin,
}