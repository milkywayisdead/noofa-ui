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

export {
    dialogMixin,
}