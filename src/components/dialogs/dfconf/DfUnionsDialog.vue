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
import NooSelect from '@/components/inputs/NooSelect.vue'
import { dfConfDialogMixin } from '@/utils/mixins/dialogs'
import DfConfItemsList from './DfConfItemsList.vue'

export default {
    name: 'DfUnionsDialog',
    mixins: [dfConfDialogMixin,],
    data(){
        return {
            dfFrom: 'dataframe',
            dfId: '',
            expression: '',
            relatedDfProp: 'unions',
        }
    },
    computed: {
        usingExpression(){
            return this.dfFrom === 'expression'
        },
        addButtonIsEnabled(){
            const value = this.dfFrom === 'dataframe' ? this.dfId : this.expression
            return value.length > 0
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.dfFrom = 'dataframe'
            this.expression = ''
            this.dfId = ''
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            const union = item
            const fromExpression = union.from === 'expression'
            const value = union.value
            this.dfFrom = union.from
            this.expression = fromExpression ? value : ''
            this.dfId = fromExpression ? '' : value
        },
        itemToConf(){
            return {
                from: this.dfFrom,
                value: this.usingExpression ? this.expression : this.dfId,
            }
        },
    },
    watch: {
        dfConfItems(){
            if(!this.$refs.unionsList){
                return
            }

            this.$refs.unionsList.updateItems(
                this.dfConfItems.map(item => {
                    const fromExpression = item.from === 'expression'
                    let value = item.value
                    if(!fromExpression){
                        value = this.context.dataframes[item.value].name
                    }
                    return `+ ${value}`
                })
            )
        },
    },
    components: {
        DfConfItemsList,
        NooSelect,
    },
}
</script>