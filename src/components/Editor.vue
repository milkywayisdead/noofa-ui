<template>
    <v-toolbar density="compact">
        <open-profile-dialog />
        <v-btn 
            icon="mdi-content-save"
            @click="saveProfile" />
        <profile-settings-dialog />
        <new-source-dialog />
        <new-query-dialog />
    </v-toolbar>
    <v-row>
        <v-col cols="2">
            <profile-tree @profile-item-selected="addTab"></profile-tree>
        </v-col>
        <v-col cols="10">
            <tabs-area ref="tabsArea"></tabs-area>
        </v-col>
    </v-row>
</template>

<script>
import ProfileTree from '@/components/profile_tree/ProfileTree.vue'
import TabsArea from '@/components/tabs/TabsArea.vue'
import NewSourceDialog from './dialogs/NewSourceDialog.vue'
import OpenProfileDialog from './dialogs/OpenProfileDialog.vue'
import NewQueryDialog from './dialogs/NewQueryDialog.vue'
import ProfileSettingsDialog from './dialogs/ProfileSettingsDialog.vue'

export default {
    name: 'Editor',
    inject: ['api', 'context'],
    methods: {
        saveProfile(){
            const method = this.context.hasId() ? this.api.updateProfile : this.api.createProfile
            const args = [this.context.compile()]
            if(this.context.hasId()){
                args.unshift(this.context.id)
            }
            method(...args)
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data)
                    }
                })
        },
        addTab(itemProps){
            this.$refs.tabsArea.addTab(itemProps)
        },
    },
    components: {
        NewSourceDialog,
        NewQueryDialog,
        OpenProfileDialog,
        ProfileSettingsDialog,
        ProfileTree,
        TabsArea,
    },
}
</script>