<template>
    <base-dialog
        :title="locale.dataframes.dtypesConv"
        activator-icon="mdi-numeric"
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
                        :label="locale.dataframes.targetDtype"
                        v-model="dtype" 
                        :items="dtypes" />
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
import { dtypes } from '@/utils/df.js'

export default {
    name: 'DfDtypesDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            colName: '',
            dtype: 'none',
            relatedDfProp: 'dtypes',
            dtypes: dtypes.map(t => {
                return {
                    text: this.locale.dataframes.dtypes[t],
                    value: t,
                }
            }),
        }
    },
    computed: {
        addButtonIsEnabled(){
            return this.colName.length > 0 && this.dtype !== 'none'
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.colName = ''
            this.dtype = 'none'
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            this.colName = item.col
            this.dtype = item.dtype
        },
        itemToConf(){
            return {
                col: this.colName,
                dtype: this.dtype,
            }
        },
        _itemToStr(item){
            return `${item.col} -> ${item.dtype}`
        },
    },
    components: {
        DfConfItemsList,
        NooTextField,
        NooSelect,
    },
}
</script>