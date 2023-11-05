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
        <v-col cols="3"></v-col>
        <v-col cols="9">
            <dashboard-edit-area ref="editArea" />
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
        this.setEditAreaSize(2000, 2000)
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
    },
    components: {
        NooTextField,
        IconButton,
        BtnDropdownMenu,
        DashboardEditArea,
    }
}
</script>