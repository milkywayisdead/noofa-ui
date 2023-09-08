<template>
    <v-toolbar density="compact">
        <open-profile-dialog />
        <v-btn 
            icon="mdi-content-save"
            @click="saveProfile" />
        <new-source-dialog />
        <v-btn icon="mdi-swap-horizontal" />
        <v-btn icon="mdi-table-large-plus" />
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
        OpenProfileDialog,
        ProfileTree,
        TabsArea,
    },
}
</script>