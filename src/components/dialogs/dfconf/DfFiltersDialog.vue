<template>
    <base-dialog
        :title="locale.dataframes.filters"
        activator-icon="mdi-table-filter"
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
                        <v-radio :label="locale.dataframes.fromSettings" value="json"></v-radio>
                        <v-radio :label="locale.dataframes.expression" value="expression"></v-radio>
                    </v-radio-group>
                </v-col>
                <div v-if="!usingExpression" style="width: 100%">
                    <v-col cols="12">
                        <noo-text-field 
                            :label="locale.dataframes.colName" 
                            v-model="colName" />
                    </v-col>
                    <v-col cols="12">
                        <noo-select
                            :label="locale.dataframes.filterType"
                            v-model="filterType" 
                            :items="filters" />
                    </v-col>
                    <v-col cols="12">
                        <noo-text-field 
                            :label="locale.dataframes.filterValue" 
                            v-model="filterValue" />
                    </v-col>
                    <v-col cols="12">
                        <noo-select
                            :label="locale.dataframes.convertTo"
                            v-model="convertTo" 
                            :items="conversions" />
                    </v-col>
                </div>
                <v-col cols="12" v-if="usingExpression">
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
import { filters } from '@/utils/df.js'

export default {
    name: 'DfColsDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            from: 'json',
            colName: '',
            expression: '',
            filterType: '>',
            filterValue: '',
            convertTo: 'none',
            relatedDfProp: 'filters',
            filters: filters.map(f => {
                return {
                    text: this.locale.dataframes.filtersOperators[f],
                    value: f,
                }
            }),
            conversions: ['none', 'num', 'bool'].map(c => {
                return {
                    text: this.locale.dataframes.conversions[c],
                    value: c,
                }
            }),
        }
    },
    computed: {
        addButtonIsEnabled(){
            if(this.usingExpression){
                return this.expression.length
            }

            const lcValue = this.filterValue.toLowerCase()
            const basics = this.colName.length && this.filterValue.length
            const convIsValid = this.convertTo === 'bool' ? ['true', 'false'].includes(lcValue) : true
            return basics && convIsValid
                
        },
        usingExpression(){
            return this.from === 'expression'
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.colName = ''
            this.expression = ''
            this.from = 'expression'
            this.filterType = '>'
            this.filterValue = ''
            this.convertTo = 'none'
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            this.from = item.from
            this.expression = item.from === 'expression' ? item.value : ''
            this.colName = item.from !== 'expression' ? item.value.col_name : ''
            this.filterType = item.from !== 'expression' ? item.value.op : '>'
            this.filterValue = item.from !== 'expression' ? String(item.value.value) : ''
        },
        itemToConf(){
            let value = this.expression
            if(!this.usingExpression){
                value = {
                    is_q: false,
                    col_name: this.colName,
                    op: this.filterType,
                    value: this.convertValue(),
                }
            }
            return {
                from: this.from,
                value: value,
            }
        },
        convertValue(){
            let value = this.filterValue
            if(this.convertTo === 'num'){
                if(value.includes('.')){
                    return parseFloat(value)
                }
                return parseInt(value)
            } else if(this.convertTo === 'bool'){
                const lcValue = value.toLowerCase()
                return lcValue === 'true' ? true : false
            }

            return value
        },
        _itemToStr(item){
            const fromExpr = item.from === 'expression'
            const value = item.value
            return fromExpr ? 
                value : 
                `${value.col_name} ${value.op} ${value.value}`
        },
    },
    components: {
        DfConfItemsList,
        NooTextField,
        NooSelect,
    },
}
</script>