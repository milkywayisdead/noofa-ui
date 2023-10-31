<template>
    <base-dialog
        :title="locale.tables.aliases"
        activator-icon="mdi-rename-box"
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
                        :label="locale.tables.colName" 
                        v-model="colName" />
                </v-col>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.tables.colAlias" 
                        v-model="colAlias" />
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
import { dfConfDialogMixin } from '@/utils/mixins/dialogs'                     // Bad. Should be refactored some sunny day
import DfConfItemsList from '@/components/dialogs/dfconf/DfConfItemsList.vue'  // Bad. Should be refactored some sunny day

export default {
    name: 'TableAliasesDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            colName: '',
            colAlias: '',
            relatedDfProp: 'aliases',
        }
    },
    computed: {
        addButtonIsEnabled(){
            return this.colName.length && this.colAlias.length
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.colName = ''
            this.colAlias = ''
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            this.colName = item.col
            this.colAlias = item.alias
        },
        itemToConf(){
            return {
                col: this.colName,
                alias: this.colAlias,
            }
        },
        updateItems(items){
            const newItems = []
            for(let i in items){
                newItems.push({
                    col: i,
                    alias: items[i],
                })
            }

            this.dfConfItems = newItems
        },
        _itemToStr(item){
            return `${item.col} -> ${item.alias}`
        },
        getItems(){
            const aliases = {}
            for(let a of this.dfConfItems){
                aliases[a.col] = a.alias
            }
            return aliases
        },
    },
    components: {
        DfConfItemsList,
        NooTextField,
        NooSelect,
    },
}
</script>