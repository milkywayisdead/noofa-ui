<template>
    <base-dialog
        :title="locale.dataframes.ordering"
        activator-icon="mdi-sort-descending"
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
                    <noo-text-field 
                        :label="locale.dataframes.colName" 
                        v-model="colName" />
                </v-col>
                <v-col cols="12">
                    <noo-select
                        :label="locale.dataframes.orderingType"
                        v-model="orderingType" 
                        :items="orderingTypes" />
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
import { orderingTypes } from '@/utils/df.js'

export default {
    name: 'DfOrderingDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            colName: '',
            orderingType: 'asc',
            relatedDfProp: 'ordering',
            orderingTypes: orderingTypes.map(o => {
                return {
                    text: this.locale.dataframes.orderingTypes[o],
                    value: o,
                }
            }),

        }
    },
    computed: {
        addButtonIsEnabled(){
            return this.colName.length > 0
                
        },
        isAsc(){
            return this.orderingType === 'asc'
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.colName = ''
            this.orderingType = 'asc'
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            this.colName = item.cols
            this.orderingType = item.asc === true ? 'asc' : 'desc'
        },
        itemToConf(){
            return {
                cols: this.colName,
                asc: this.isAsc,
            }
        },
        _itemToStr(item){
            const o = item.asc === true ? 'asc' : 'desc'
            return `${item.cols} ${o.toUpperCase()}`
        },
    },
    components: {
        DfConfItemsList,
        NooTextField,
        NooSelect,
    },
}
</script>