<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.dashboards.new" 
        activator-icon="mdi-view-dashboard"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.dashboards.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        :label="locale.dashboards.description"
                        v-model="description" />
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn @click="addDashboard"
                :disabled="!saveBtnEnabled">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'NewDashboardDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            name: '',
            description: '',
        }
    },
    methods: {
        reset(){
            this.name = ''
            this.description = ''
        },
        addDashboard(){
            const dash = this.context.addDashboard(this.toConf())
            if(this.context.hasId()){
                this.api.partialUpdate(this.context.id, 'dashboard', null, dash.compile())
                    .then(res => {
                        this.context.dashboards[dash.contextualId].id = res.data.id
                    }).catch(err => {
                        this.snackbar.error(
                            this.locale.messages.errorWhenSavingDashboard
                        )
                    }).finally(_ => {
                        this.$refs.baseDialog.close()
                    })
            } else {
                this.$refs.baseDialog.close()
            }
        },
        toConf(){
            return {
                contextual_id: `dash${+ new Date()}`,
                name: this.name,
                description: this.description,
                properties: {},
                widgets: {},
            }
        },
    },
    computed: {
        saveBtnEnabled(){
            return this.name.length > 0
        },
    },
    components: {
        NooTextField,
    },
}
</script>