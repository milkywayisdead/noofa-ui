<template>
    <v-toolbar density="compact">
        <dropdown-menu :label="locale.profiles.singular">
            <template v-slot:items>
                <v-list-item>
                    <v-list-item-title @click="openProfileDialog" >
                        {{ locale.profiles.open }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="saveProfile" >
                        {{ locale.actions.save }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="openProfileSettingsDialog" >
                        {{ locale.profiles.settings }}
                    </v-list-item-title>
                </v-list-item>
            </template>
        </dropdown-menu>
        <dropdown-menu :label="locale.data.data">
            <template v-slot:items>
                <v-list-item>
                    <v-list-item-title @click="openNewSourceDialog" >
                        {{ locale.sources.new }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="openNewQueryDialog" >
                        {{ locale.queries.new }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="openNewDataframeDialog" >
                        {{ locale.dataframes.new }}
                    </v-list-item-title>
                </v-list-item>
            </template>
        </dropdown-menu>
        <dropdown-menu :label="locale.components.components">
            <template v-slot:items>
                <v-list-item>
                    <v-list-item-title @click="openNewTableDialog" >
                        {{ locale.tables.new }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="openNewFigureDialog" >
                        {{ locale.figures.new }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="openNewValueDialog" >
                        {{ locale.values.new }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="openNewDocumentDialog" >
                        {{ locale.documents.new }}
                    </v-list-item-title>
                </v-list-item>
            </template>
        </dropdown-menu>
        <dropdown-menu :label="locale.dashboards.plural">
            <template v-slot:items>
                <v-list-item>
                    <v-list-item-title @click="openNewDashboardDialog" >
                        {{ locale.dashboards.new }}
                    </v-list-item-title>
                </v-list-item>
            </template>
        </dropdown-menu>
    </v-toolbar>

    <v-toolbar density="compact">
        <open-profile-dialog ref="openProfileDialog"
            @profile-selected="clearTabsArea" />
        <v-btn 
            icon="mdi-content-save"
            @click="saveProfile" />
        <profile-settings-dialog ref="profileSettingsDialog" />
        <new-source-dialog ref="newSourceDialog" />
        <new-query-dialog ref="newQueryDialog" />
        <new-dataframe-dialog ref="newDataframeDialog" />
        <new-table-dialog ref="newTableDialog" />
        <new-figure-dialog ref="newFigureDialog" />
        <new-value-dialog ref="newValueDialog" />
        <new-document-dialog ref="newDocumentDialog" />
        <new-dashboard-dialog ref="newDashboardDialog" />
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
import DropdownMenu from '@/components/dropdowns/DropdownMenu.vue'
import NewDataframeDialog from './dialogs/NewDataframeDialog.vue'
import NewTableDialog from './dialogs/NewTableDialog.vue'
import NewFigureDialog from '@/components/dialogs/NewFigureDialog.vue'
import NewValueDialog from '@/components/dialogs/NewValueDialog.vue'
import NewDocumentDialog from '@/components/dialogs/NewDocumentDialog.vue'
import NewDashboardDialog from '@/components/dialogs/NewDashboardDialog.vue'

export default {
    name: 'Editor',
    inject: ['api', 'context', 'locale'],
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
                        this.context.id = res.data.id

                        for(let dashId in res.data.dashboards){
                            const ctxDash = this.context.getItem('dashboards', dashId)
                            if(ctxDash){
                                ctxDash.id = res.data.dashboards[dashId].id
                            }
                        }
                    }
                })
        },
        addTab(itemProps){
            this.$refs.tabsArea.addTab(itemProps)
        },
        openProfileDialog(){
            this.$refs.openProfileDialog.open()
        },
        openProfileSettingsDialog(){
            this.$refs.profileSettingsDialog.open()
        },
        openNewSourceDialog(){
            this.$refs.newSourceDialog.open()
        },
        openNewQueryDialog(){
            this.$refs.newQueryDialog.open()
        },
        openNewDataframeDialog(){
            this.$refs.newDataframeDialog.open()
        },
        openNewTableDialog(){
            this.$refs.newTableDialog.open()
        },
        openNewFigureDialog(){
            this.$refs.newFigureDialog.open()
        },
        openNewValueDialog(){
            this.$refs.newValueDialog.open()
        },
        openNewDocumentDialog(){
            this.$refs.newDocumentDialog.open()
        },
        openNewDashboardDialog(){
            this.$refs.newDashboardDialog.open()
        },
        clearTabsArea(){
            this.$refs.tabsArea.clear()
        },
    },
    components: {
        NewSourceDialog,
        NewQueryDialog,
        OpenProfileDialog,
        ProfileSettingsDialog,
        DropdownMenu,
        ProfileTree,
        TabsArea,
        NewDataframeDialog,
        NewTableDialog,
        NewFigureDialog,
        NewValueDialog,
        NewDocumentDialog,
        NewDashboardDialog,
    },
}
</script>
