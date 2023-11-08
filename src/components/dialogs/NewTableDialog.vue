<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.tables.new" 
        activator-icon="mdi-table-plus"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.tables.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-radio-group 
                        v-model="from"
                        :label="locale.tables.from">
                        <v-radio :label="locale.tables.dataframe" value="dataframe"></v-radio>
                        <v-radio :label="locale.tables.expression" value="expression"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row v-if="fromExpression">
                <v-col cols="12">
                    <v-textarea
                        :label="locale.tables.expression"
                        v-model="expression" />
                </v-col>
            </v-row>
            <div v-if="!fromExpression">
                <v-row>
                    <v-col cols="12">
                        <noo-select
                            :label="locale.tables.dataframe"
                            v-model="dfName" 
                            :items="dataframes" />
                    </v-col>
                </v-row>
            </div>
        </template>
        <template v-slot:actions>
            <v-btn 
                @click="addTable"
                :disabled="!addBtnIsEnabled">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'NewTableDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            name: '',
            from: 'dataframe',
            dfName: '',
            expression: '',
            visible: false,
        }
    },
    methods: {
        addTable(){
            const conf = this.toConf()
            const table = this.context.addTable(conf)
            if(this.context.hasId()){
                this.api.partialUpdate(this.context.id, 'table', table.id, table.compile())
                    .then(res => {
                        this.snackbar.success(
                            this.locale.messages.tableSavedSuccess
                        )
                    })
                    .catch(err => {
                        this.snackbar.error(
                            this.locale.messages.errorWhenSavingTable
                        )
                    })
                    .finally(_ => {
                        this.$refs.baseDialog.close()
                    })
            } else {
                this.$refs.baseDialog.close()
            }
        },
        toConf(){
            const tableId = `table${+ new Date()}`
            const conf = {
                type: 'table',
                id: tableId,
                name: this.name,
                base: this.getBase(),
            }
            return conf
        },
        getBase(){
            const base = {
                from: this.from,
                value: this.value,
            }
            return base
        },
        reset(){
            for(let prop of [
                'name', 'dfName', 'expression',
            ]){
                this[prop] = ''
            }
            this.from = 'dataframe'
        },
    },
    computed: {
        fromExpression(){
            return this.from === 'expression'
        },
        dataframes(){
            return Object.values(this.context.dataframes).map(df => {
                return {
                    value: df.name,
                    text: df.name,
                }
            })
        },
        addBtnIsEnabled(){
            return this.name.length && this.value.length
        },
        value(){
            return this.fromExpression ? this.expression : this.dfName
        },
    },
    components: {
        NooTextField,
        NooSelect,
    },
}
</script>