<template>
    <base-dialog
        :title="locale.dataframes.extraCols"
        activator-icon="mdi-table-column-plus-before"
        @close="reset"
        :width="'40%'"
        ref="baseDialog"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <df-conf-items-list ref="itemsList"
                        @item-add="mode = isEditing ? 'idle' : 'add'" 
                        @item-edit="handleEdit"
                        @item-delete="handleDelete" 
                        @mounted="getItemsFromContext" />
                </v-col>
            </v-row>
            <v-row v-if="isEditing">
                <v-col cols="12">
                    <v-radio-group 
                        v-model="from"
                        :label="locale.dataframes.from">
                        <v-radio :label="locale.dataframes.applyValue" value="expression"></v-radio>
                        <v-radio :label="locale.dataframes.applyExpr" value="apply"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.dataframes.colName" 
                        v-model="colName" />
                </v-col>
                <v-col cols="12">
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
import { dfConfDialogMixin } from '@/utils/mixins/dialogs'
import DfConfItemsList from './DfConfItemsList.vue'

export default {
    name: 'DfColsDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            from: 'expression',
            colName: '',
            expression: '',
            relatedDfProp: 'columns',
        }
    },
    computed: {
        addButtonIsEnabled(){
            return this.colName.length && this.expression.length
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.colName = ''
            this.expression = ''
            this.from = 'expression'
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            this.from = item.from
            this.expression = item.value
            this.colName = item.name
        },
        itemToConf(){
            return {
                from: this.from,
                value: this.expression,
                name: this.colName,
            }
        },
        _itemToStr(item){
            return `${item.name}: ${item.value}`
        },
    },
    components: {
        DfConfItemsList,
        NooTextField,
    },
}
</script>