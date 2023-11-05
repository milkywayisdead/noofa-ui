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
        <dropdown-menu :label="locale.locale">
            <template v-slot:items>
                <v-list-item v-for="loc in locales" :key="loc.name">
                    <v-list-item-title @click="changeLocale(loc.name)" >
                        <v-icon v-show="loc.name === locale.localeName"
                            icon="mdi-earth"
                            size="x-small"
                            class="mr-1" />
                        <span>{{ loc.text }}</span>
                    </v-list-item-title>
                </v-list-item>
            </template>
        </dropdown-menu>
    </v-toolbar>

    <v-toolbar density="compact">
        <open-profile-dialog ref="openProfileDialog"
            @profile-selected="clearTabsArea" />
        <icon-button
            icon="mdi-content-save"
            :tooltip="locale.profiles.save"
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
            <profile-tree :ctxmenus="ctxmenus"
                @profile-item-selected="addTab"
                @profile-item-delete="deleteProfileItem"></profile-tree>
        </v-col>
        <v-col cols="10" style="flex:none;height:100%">
            <tabs-area ref="tabsArea"></tabs-area>
        </v-col>
    </v-row>

    <locale-change-dialog ref="localeChangeDialog"
        @reload-confirmed="requestReload" />

    <delete-confirmation-dialog v-if="deletingItem"
        ref="deleteConfirmationDialog"
        :item-id="itemToDelete.type === 'dashboard' ? itemToDelete.props.contextualId : itemToDelete.props.id"
        :item-name="itemToDelete.props.name"
        :item-group="itemToDelete.type"
        :item-group-plural="plurals[itemToDelete.type]"
        @item-delete="handleItemDelete"
        :no-activator="true"
    />
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
import IconButton from '@/components/misc/IconButton.vue'
import { locales } from '@/utils/locales/locales.js'
import LocaleChangeDialog from '@/components/dialogs/LocaleChangeDialog.vue'
import DeleteConfirmationDialog from '@/components/dialogs/DeleteConfirmationDialog.vue'

export default {
    name: 'Editor',
    inject: ['api', 'context', 'locale', 'snackbar'],
    data(){
        return {
            locales: locales,
            ctxmenus: {
                data: [
                    {
                        title: this.locale.sources.new,
                        children: [],
                        onclick: this.openNewSourceDialog,
                        icon: 'mdi-database',
                    },
                    {
                        title: this.locale.queries.new,
                        children: [],
                        onclick: this.openNewQueryDialog,
                        icon: 'mdi-database-search',
                    },
                    {
                        title: this.locale.dataframes.new,
                        children: [],
                        onclick: this.openNewDataframeDialog,
                        icon: 'mdi-table-large-plus',
                    },
                ],
                sources: [
                    {
                        title: this.locale.sources.new,
                        children: [],
                        onclick: this.openNewSourceDialog,
                        icon: 'mdi-database',
                    }, 
                ],
                queries: [
                    {
                        title: this.locale.queries.new,
                        children: [],
                        onclick: this.openNewQueryDialog,
                        icon: 'mdi-database-search',
                    },
                ],
                dataframes: [
                    {
                        title: this.locale.dataframes.new,
                        children: [],
                        onclick: this.openNewDataframeDialog,
                        icon: 'mdi-table-large-plus',
                    },
                ],
                components: [
                    {
                        title: this.locale.tables.new,
                        children: [],
                        onclick: this.openNewTableDialog,
                        icon: 'mdi-table-plus',
                    },
                    {
                        title: this.locale.figures.new,
                        children: [],
                        onclick: this.openNewFigureDialog,
                        icon: 'mdi-chart-line',
                    },
                ],
                tables: [
                    {
                        title: this.locale.tables.new,
                        children: [],
                        onclick: this.openNewTableDialog,
                        icon: 'mdi-table-plus',
                    },
                ],
                figures: [
                    {
                        title: this.locale.figures.new,
                        children: [],
                        onclick: this.openNewFigureDialog,
                        icon: 'mdi-chart-line',
                    },
                ],
                values: [
                    {
                        title: this.locale.values.new,
                        children: [],
                        onclick: this.openNewValueDialog,
                        icon: 'mdi-format-superscript',
                    },
                ],
                documents: [
                    {
                        title: this.locale.documents.new,
                        children: [],
                        onclick: this.openNewDocumentDialog,
                        icon: 'mdi-file-pdf-box',
                    },
                ],
                dashboards : [
                    {
                        title: this.locale.dashboards.new,
                        children: [],
                        onclick: this.openNewDashboardDialog,
                        icon: 'mdi-view-dashboard',
                    },
                ],
            },
            itemToDelete: {},
            deletingItem: false,
            plurals: {
                source: 'sources',
                query: 'queries',
                dataframe: 'dataframes',
                table: 'tables',
                figure: 'figures',
                value: 'values',
                document: 'documents',
                dashboard: 'dashboards',
            },
        }
    },
    emits: ['reload-requested'],
    methods: {
        saveProfile(){
            const creating = !this.context.hasId()
            const method = creating ? this.api.createProfile : this.api.updateProfile
            const args = [this.context.compile()]
            if(!creating){
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

                        this.snackbar.success(
                            this.locale.messages.profileSavedSuccess
                        )
                    }
                }).catch(err => {
                    const message = creating ? 
                        this.locale.messages.errorWhenCreatingProfile :
                        this.locale.messages.errorWhenSavingProfile
                    this.snackbar.error(message)
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
        changeLocale(localeName){
            localStorage.setItem('noofaLocale', localeName)
            this.$refs.localeChangeDialog.open()
        },
        requestReload(){
            this.$emit(
                'reload-requested',
                localStorage.getItem('noofaLocale')
            )
        },
        deleteProfileItem(event){
            console.log(event)
            this.itemToDelete = event
            this.deletingItem = true
            this.$nextTick(_ => {
                    this.$refs.deleteConfirmationDialog.open()
                })
        },
        handleItemDelete(){
            this.deletingItem = false
            const itemId = this.itemToDelete.type === 'dashboard' ? this.itemToDelete.props.contextualId : this.itemToDelete.props.id
            this.$refs.tabsArea.closeTab(itemId)
            this.itemToDelete = {}
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
        IconButton,
        LocaleChangeDialog,
        DeleteConfirmationDialog,
    },
}
</script>
