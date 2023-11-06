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
    </v-toolbar>
    <v-row class="mt-2 rigid-row" :id="rowContainerId">
        <v-col cols="3">
            <v-expansion-panels>
                <v-expansion-panel :title="locale.dashboards.settings">
                    <v-expansion-panel-text>
                        <v-row>
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
                                    v-model="bindToGrid"
                                    :label="locale.dashboards.bindToGrid" />
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel v-if="widgetSelected"
                    :title="locale.dashboards.widgetSettings"></v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-col cols="9">
            <dashboard-edit-area ref="editArea" 
                @widget-selected="widgetSelected = true"
                @widget-unselected="widgetSelected = false" />
        </v-col>
    </v-row>
</template>

<script>
import NooTextField from '../inputs/NooTextField.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import IconButton from '@/components/misc/IconButton.vue'
import BtnDropdownMenu from '@/components/misc/BtnDropdownMenu.vue'
import DashboardEditArea from '@/components/dashboards/DashboardEditArea.vue'

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

            bindToGrid: false,
            width: 1000,
            height: 1000,
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
    },
    mounted(){
        this.setEditAreaSize(
            this.width,
            this.height
        )
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
    components: {
        NooTextField,
        IconButton,
        BtnDropdownMenu,
        DashboardEditArea,
    }
}
</script>