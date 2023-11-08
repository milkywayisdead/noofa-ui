<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.values.new" 
        activator-icon="mdi-format-superscript"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.values.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        :label="locale.values.expression"
                        v-model="expression" />
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn @click="addValue"
                :disabled="!saveBtnEnabled">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'NewValueDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            name: '',
            expression: '',
        }
    },
    methods: {
        reset(){
            this.name = ''
            this.expression = ''
        },
        addValue(){
            const value = this.context.addValue(this.toConf())
            if(this.context.hasId()){
                this.api.partialUpdate(this.context.id, 'value', value.id, value.compile())
                    .then(res => {
                        this.snackbar.success(
                            this.locale.messages.valueSavedSuccess
                        )
                    })
                    .catch(err => {
                        this.snackbar.error(
                            this.locale.messages.errorWhenSavingValue
                        )
                    })
                    .finally(_ => {
                        this.$refs.baseDialog.close()
                    })
            } else {
                this.$refs.baseDialog.close()
            }
        },
        toConf(){
            return {
                id: `value${+ new Date()}`,
                name: this.name,
                value: this.expression,
            }
        },
    },
    computed: {
        saveBtnEnabled(){
            return this.name.length > 0 && this.expression.length > 0
        },
    },
    components: {
        NooTextField,
    },
}
</script>