<template>
    <base-dialog
        :title="locale.tables.exclude"
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
                        :label="locale.tables.colName" 
                        v-model="colName" />
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
    name: 'TableExcludeDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            colName: '',
            relatedDfProp: 'exclude',
        }
    },
    computed: {
        addButtonIsEnabled(){
            return this.colName.length > 0
                
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.colName = ''
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            this.colName = item
        },
        itemToConf(){
            return this.colName
        },
        _itemToStr(item){
            return item
        },
    },
    components: {
        DfConfItemsList,
        NooTextField,
        NooSelect,
    },
}
</script>