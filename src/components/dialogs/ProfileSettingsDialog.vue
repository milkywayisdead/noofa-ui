<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.profiles.settings" 
        activator-icon="mdi-cog"
        :on-open="fillSettings"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.profiles.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.profiles.description"
                        v-model="description" />
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn :disabled="!saveBtnEnabled"
                @click="save">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'ProfileSettingsDialog',
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
        fillSettings(){
            this.name = this.context.name
            this.description = this.context.description
        },
        save(){
            this.context.name = this.name
            this.context.description = this.description
            this.$refs.baseDialog.close()
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