import BaseDialog from '@/components/dialogs/BaseDialog.vue'

const dialogMixin = {
    inject: ['api', 'locale', 'context'],
    components: {
        BaseDialog,
    },
}

export {
    dialogMixin,
}