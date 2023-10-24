<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save"
            :disabled="!saveBtnEnabled"
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
            const dash = this.context.updateDashboard(this.id, this.toConf())
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
    components: {
        NooTextField,
    }
}
</script>