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
    </v-toolbar>
    <v-row class="mt-2">
    </v-row>
</template>

<script>
import NooTextField from '../inputs/NooTextField.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import IconButton from '@/components/misc/IconButton.vue'

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
    }
}
</script>