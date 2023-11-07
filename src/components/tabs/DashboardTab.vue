<template>
    <v-toolbar density="compact">
        <icon-button ref="saveButton"
            icon="mdi-content-save"
            :tooltip="locale.actions.save"
            @click="updateDashboard" />
        <delete-confirmation-dialog 
            :item-id="contextualId"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'dashboards'"
            @item-delete="emitItemDelete($event)"
        />
        <btn-dropdown-menu 
            :items="widgetsTypesList"
            icon="mdi-widgets"
            :tooltip="locale.widgets.new"
            @item-selected="addWidget"
        />
        <icon-button
            icon="mdi-file-eye"
            :tooltip="locale.dashboards.preview"
            @click="preview" />
    </v-toolbar>
    <v-row class="mt-2 rigid-row" :id="rowContainerId">
        <v-col cols="3">
            <v-expansion-panels>
                <v-expansion-panel :title="locale.dashboards.settings">
                    <v-expansion-panel-text>
                        <v-row>
                            <v-col cols="12">
                                <noo-text-field :label="locale.dashboards.name"
                                    v-model="name" />
                            </v-col>
                            <v-col cols="12">
                                <noo-text-field :label="locale.dashboards.height"
                                    v-model="height" />
                            </v-col>
                            <v-col cols="12">
                                <noo-text-field :label="locale.dashboards.width"
                                    v-model="width" />
                            </v-col>
                            <v-col cols="12">
                                <v-checkbox 
                                    v-model="scaling"
                                    :label="locale.dashboards.scaling"
                                    hide-details 
                                    density="compact" />
                            </v-col>
                            <v-col cols="12">
                                <v-checkbox 
                                    v-model="bindToGrid"
                                    :label="locale.dashboards.bindToGrid"
                                    hide-details
                                    density="compact" />
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <component v-if="widgetSelected"
                    :is="`${selectedWidget.type}-widget-settings`"
                    :panel-title="locale.dashboards.widgetSettings"
                    :widget="selectedWidget.getWidgetProps()"
                    @property-changed="selectedWidget.updateProperty"
                />

            </v-expansion-panels>
        </v-col>
        <v-col cols="9">
            <dashboard-edit-area ref="editArea" 
                @widget-selected="selectedHandler"
                @widget-unselected="unselectedHandler" />
        </v-col>
    </v-row>
</template>

<script>
import NooTextField from '../inputs/NooTextField.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import IconButton from '@/components/misc/IconButton.vue'
import BtnDropdownMenu from '@/components/misc/BtnDropdownMenu.vue'
import DashboardEditArea from '@/components/dashboards/editor/DashboardEditArea.vue'
import TextWidgetSettings from '@/components/dashboards/settings/TextWidgetSettings.vue'
import TableWidgetSettings from '@/components/dashboards/settings/TableWidgetSettings.vue'
import FigureWidgetSettings from '@/components/dashboards/settings/FigureWidgetSettings.vue'

export default {
    name: 'DashboardTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            contextualId: props.contextualId,
            id: props.id,
            name: props.name,
            itemGroup: 'dashboard',
            widgetsTypesList: Object.keys(this.locale.widgets.types).map(
                w => {
                    return {
                        value: w,
                        title: this.locale.widgets.types[w],
                    }
                }
            ),
            widgetSelected: false,
            selectedWidget: null,

            bindToGrid: false,
            width: props.properties.width || 1000,
            height: props.properties.height || 1000,
            scaling: props.properties.scaling || false,
        }

        return tabProps
    },
    methods: {
        updateDashboard(){
            const dash = this.context.updateDashboard(this.contextualId, this.toConf())
            this.updateItem(dash)   
        },
        toConf(){
            const conf = {
                id: this.id,
                contextual_id: this.contextualId,
                name: this.name,
                widgets: this.$refs.editArea.getWidgets(),
                properties: {
                    height: this.height,
                    width: this.width,
                    scaling: this.scaling,
                },
            }
            return conf
        },
        addWidget(widgetType){
            this.$refs.editArea.addWidget(widgetType)
        },
        setEditAreaSize(w=10, h=10){
            this.$refs.editArea.setSize(w, h)
        },
        afterContainerResize(){
            const rc = document.getElementById(this.rowContainerId)
            const r1 = rc.getBoundingClientRect()
            const ea = document.getElementById(this.$refs.editArea.containerId)
            const r2 = ea.getBoundingClientRect()
            this.$refs.editArea.setContainerHeight(
                r1.y + r1.height - 10 - r2.y
            )
        },
        selectedHandler(e){
            this.widgetSelected = true
            this.selectedWidget = e
        },
        unselectedHandler(e){
            this.widgetSelected = false
            this.selectedWidget = null
        },
        getUUID(){
            return this.id
        },
        preview(){
            if(this.id){
                const r = this.$router.resolve({path: `/dashboard/${this.id}`})
                window.open(r.href)
            }
        },
    },
    mounted(){
        this.setEditAreaSize(
            this.width,
            this.height
        )

        for(let w of Object.values(this.itemProps.widgets)){
            this.$refs.editArea.addWidget(w.type, w)
        }
    },
    computed: {
        saveBtnEnabled(){
            return this.name.length
        },
    },
    watch: {
        saveBtnEnabled(value){
            this.$refs.saveButton.setEnabledProp(value)
        },
        bindToGrid(value){
            this.$refs.editArea.bindToGrid = value
        },
        height(value){
            this.$refs.editArea.setSize(
                this.width,
                value
            )
        },
        width(value){
            this.$refs.editArea.setSize(
                value,
                this.height,
            )
        },
    },
    provide(){
        return {
            dashboard: this,
        }
    },
    components: {
        NooTextField,
        IconButton,
        BtnDropdownMenu,
        DashboardEditArea,
        TextWidgetSettings,
        TableWidgetSettings,
        FigureWidgetSettings,
    }
}
</script>