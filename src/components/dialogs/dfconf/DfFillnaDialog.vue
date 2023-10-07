<template>
    <base-dialog
        :title="locale.dataframes.fillna"
        activator-icon="mdi-null"
        @close="reset"
        :width="'40%'"
        ref="baseDialog"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <df-conf-items-list ref="fillnaList"
                        @item-add="mode = isEditing ? 'idle' : 'add'" 
                        @item-edit="handleEdit"
                        @item-delete="handleDelete" 
                        @mounted="getItemsFromContext" />
                </v-col>
            </v-row>
            <v-row v-if="isEditing">
                <v-col cols="12">
                    <noo-select
                        :label="locale.dataframes.fillnaAction"
                        v-model="fillnaAction" 
                        :items="fillnaActions" />
                </v-col>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.dataframes.colName" 
                        v-model="colName" />
                </v-col>
                <v-col cols="12" v-if="usingFill">
                    <v-textarea v-model="expression" 
                        :label="locale.dataframes.expression" />
                </v-col>
                <v-col cols="12">
                    <v-btn v-if="mode === 'add'"
                        @click="addItem"
                        :disabled="!addButtonIsEnabled" >
                        {{ locale.actions.add }}
                    </v-btn>
                    <v-btn v-if="mode === 'edit'"
                        @click="updateItem"
                        :disabled="!addButtonIsEnabled" >
                        {{ locale.actions.save }}
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn @click="saveConfAndClose">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from '../BaseDialog.vue'
import NooTextField from '@/components/inputs/NooTextField.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'
import { dfConfDialogMixin } from '@/utils/mixins/dialogs'
import DfConfItemsList from './DfConfItemsList.vue'
import { fillnaActions } from '@/utils/df.js'

export default {
    name: 'DfColsDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            colName: '',
            expression: '',
            fillnaAction: 'fill',
            relatedDfProp: 'fillna',
            fillnaActions: fillnaActions.map(a => {
                return {
                    text: this.locale.dataframes.fillnaActions[a],
                    value: a,
                }
            }),
        }
    },
    computed: {
        addButtonIsEnabled(){
            return this.usingFill ? this.expression.length : true
        },
        usingFill(){
            return this.fillnaAction === 'fill'
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.colName = ''
            this.expression = ''
            this.fillnaAction = 'fill'
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            this.fillnaAction = item.action
            this.expression = item.action === 'fill' ? item.value : ''
            this.colName = item.col
        },
        itemToConf(){
            return {
                action: this.fillnaAction,
                value: this.usingFill ? this.expression : '',
                col: this.colName,
            }
        },
    },
    watch: {
        dfConfItems(){
            if(!this.$refs.fillnaList){
                return
            }

            this.$refs.fillnaList.updateItems(
                this.dfConfItems.map(
                    item => `${item.action}: ${item.col === '' ? 'all' : item.col}`
                )
            )
        },
    },
    components: {
        DfConfItemsList,
        NooTextField,
        NooSelect,
    },
}
</script>