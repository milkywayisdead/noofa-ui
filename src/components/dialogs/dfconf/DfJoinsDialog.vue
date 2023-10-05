<template>
    <base-dialog
        :title="locale.dataframes.joinPlural"
        activator-icon="mdi-table-arrow-left"
        @close="reset"
        :width="'40%'"
        ref="baseDialog"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <df-conf-items-list ref="joinsList"
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
                    <noo-text-field 
                        :label="locale.dataframes.originalDfCol" 
                        v-model="originalDfCol" />
                </v-col>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.dataframes.joinableDfCol" 
                        v-model="joinableDfCol" />
                </v-col>
                <v-col cols="12">
                    <noo-select
                        :label="locale.dataframes.joinType"
                        v-model="joinType" 
                        :items="joinTypes" />
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
import { defaultJoinType, joinTypes } from '@/utils/df.js'

export default {
    name: 'DfJoinsDialog',
    mixins: [dfConfDialogMixin, ],
    data(){
        return {
            dfFrom: 'dataframe',
            dfId: '',
            expression: '',
            originalDfCol: '',
            joinableDfCol: '',
            joinType: defaultJoinType,
            joinTypes: joinTypes.map(jt => {
                return {
                    text: jt,
                    value: jt,
                }
            }),
            relatedDfProp: 'joins',
        }
    },
    computed: {
        usingExpression(){
            return this.dfFrom === 'expression'
        },
        addButtonIsEnabled(){
            const value = this.dfFrom === 'dataframe' ? this.dfId : this.expression
            return value.length > 0 && 
                this.originalDfCol.length > 0 &&
                this.joinableDfCol.length > 0
        },
    },
    methods: {
        reset(){
            this.mode = 'idle'
            this.dfFrom = 'dataframe'
            this.expression = ''
            this.dfId = ''
            this.originalDfCol = ''
            this.joinableDfCol = ''
            this.joinType = defaultJoinType
            this.selectedItemIdx = null
        },
        fillConfFields(item){
            const fromExpression = item.from === 'expression'
            const value = item.value
            this.dfFrom = item.from
            this.expression = fromExpression ? value : ''
            this.dfId = fromExpression ? '' : value
            this.originalDfCol = item.on[0]
            this.joinableDfCol = item.on[1]
            this.joinType = item.type
        },
        itemToConf(){
            return {
                from: this.dfFrom,
                value: this.usingExpression ? this.expression : this.dfId,
                on: [this.originalDfCol, this.joinableDfCol],
                type: this.joinType,
            }
        },
    },
    watch: {
        dfConfItems(){
            if(!this.$refs.joinsList){
                return
            }

            this.$refs.joinsList.updateItems(
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
        NooTextField,
    },
}
</script>