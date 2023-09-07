<template>
    <base-dialog
        :title="locale.profiles.open"
        activator-icon="mdi-folder-open"
        :on-open="getProfiles"
    >
        <template v-slot:content>

        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'

export default {
    name: 'OpenProfileDialog',
    data(){
        return {

        }
    },
    methods: {
        getProfiles(){
            this.api.getProfiles()
        },
    },
    inject: ['api', 'locale'],
    components: {
        BaseDialog,
    },
}
</script>