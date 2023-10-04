<template>
    <base-dialog
        :title="locale.dataframes.unionPlural"
        activator-icon="mdi-table-row-plus-before"
        @close="reset"
        :width="'40%'"
        ref="baseDialog"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <df-conf-items-list ref="unionsList"
                        @item-add="mode = isEditing ? 'idle' : 'add'" 
                        @item-edit="handleEdit"
                        @item-delete="handleDelete" 
                        @mounted="getItemsFromContext" />
                </v-col>
            </v-row>
            <v-row v-if="isEditing">
                <v-col cols="12">
                    <v-radio-group 
                        v-model="dfFrom"
                        :label="locale.dataframes.from">
                        <v-radio :label="locale.dataframes.singular" value="dataframe"></v-radio>
                        <v-radio :label="locale.dataframes.expression" value="expression"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12" v-if="!usingExpression">
                    <noo-select
                        :label="locale.dataframes.singular"
                        v-model="dfId" 
                        :items="dataframes" />
                </v-col>
                <v-col cols="12" v-if="usingExpression">
                    <v-textarea v-model="expression" 
                        :label="locale.dataframes.expression" />
                </v-col>
                <v-col cols="12">
                    <v-btn v-if="mode === 'add'"
                        @click="addUnion"
                        :disabled="!addButtonIsEnabled" >
                        {{ locale.actions.add }}
                    </v-btn>
                    <v-btn v-if="mode === 'edit'"
                        @click="updateUnion"
                        :disabled="!addButtonIsEnabled" >
                        {{ locale.actions.save }}
                    </v-btn>
                </v-col>
            </v-row>
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from '../BaseDialog.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'
import DfConfItemsList from './DfConfItemsList.vue'

export default {
    name: 'DfUnionsDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            mode: 'idle',
            dfFrom: 'dataframe',
            dfId: '',
            expression: '',
            dfConfItems: [],
            selectedItemIdx: null,
        }
    },
    props: {
        dataframeId: {
            type: String,
        },
    },
    computed: {
        isEditing(){
            return ['add', 'edit'].includes(this.mode)
        },
        dataframes(){
            return Object.values(this.context.dataframes).map(df => {
                return {
                    value: df.id,
                    text: df.name,
                }
            })
        },
        usingExpression(){
            return this.dfFrom === 'expression'
        },
        addButtonIsEnabled(){
            const value = this.dfFrom === 'dataframe' ? this.dfId : this.expression
            return value.length > 0
        },
    },
    emits: [
        'items-updated',
    ],
    methods: {
        reset(){
            this.mode = 'idle'
            this.dfFrom = 'dataframe'
            this.expression = ''
            this.dfId = ''
            this.selectedItemIdx = null
        },
        handleEdit(itemIdx){
            this.mode = 'edit'
            this.selectedItemIdx = itemIdx

            const union = this.dfConfItems[itemIdx]
            const fromExpression = union.from === 'expression'
            const value = union.value
            this.dfFrom = union.from
            this.expression = fromExpression ? value : ''
            this.dfId = fromExpression ? '' : value
        },
        handleDelete(itemIdx){
            this.dfConfItems = this.dfConfItems.filter((item, idx) => idx !== itemIdx)
            this.selectedItemIdx = null
        },
        addUnion(){
            this.dfConfItems.push(this.itemToConf())
            this.dfConfItems = this.dfConfItems.filter(item => true)
            this.reset()
            this.emitUpdated()
        },
        updateUnion(){
            this.dfConfItems[this.selectedItemIdx] = this.itemToConf()
            this.dfConfItems = this.dfConfItems.filter(item => true)
            this.reset()
            this.emitUpdated()
        },
        itemToConf(){
            return {
                from: this.dfFrom,
                value: this.usingExpression ? this.expression : this.dfId,
            }
        },
        getItems(){
            return this.dfConfItems
        },
        updateItems(items){
            this.dfConfItems = items.filter(item => true)
        },
        emitUpdated(){
            this.$emit('items-updated')
        },
        getItemsFromContext(){
            this.updateItems(this.context.dataframes[this.dataframeId].unions)
        },
    },
    watch: {
        dfConfItems(){
            if(!this.$refs.unionsList){
                return
            }

            this.$refs.unionsList.updateItems(
                this.dfConfItems.map(item => `+ ${item.value}`)
            )
        },
    },
    components: {
        DfConfItemsList,
        NooSelect,
    },
}
</script>