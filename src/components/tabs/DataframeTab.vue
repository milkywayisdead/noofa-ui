<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save" 
            @click="updateDf" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'dataframes'"
            @item-delete="emitItemDelete($event)"
        />
        <v-btn icon="mdi-play" 
            @click="getData" />
        <df-unions-dialog ref="unionsDialog"
            :dataframe-id="id"
            @items-updated="updateDf" />
        <df-joins-dialog ref="joinsDialog"
            :dataframe-id="id"
            @items-updated="updateDf" />
    </v-toolbar>
    <v-row class="mt-2">
        <v-col cols="3">
            <v-row>
                <v-col cols="12">
                    <noo-text-field
                        v-model="name"
                        :label="locale.queries.name"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-radio-group 
                        v-model="from"
                        :label="locale.dataframes.from">
                        <v-radio :label="locale.dataframes.query" value="query"></v-radio>
                        <v-radio :label="locale.dataframes.expression" value="expression"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row v-if="fromExpression">
                <v-col cols="12">
                    <v-textarea
                        :label="locale.queries.expression"
                        v-model="expression" />
                </v-col>
            </v-row>
            <div v-if="!fromExpression">
                <v-row>
                    <v-col cols="12">
                        <noo-select
                            :label="locale.dataframes.source"
                            v-model="source" 
                            :items="sources" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <noo-select
                            :label="locale.dataframes.query"
                            v-model="query" 
                            :items="queries" />
                    </v-col>
                </v-row>
            </div>
        </v-col>
        <v-col cols="9">
           <data-table v-if="tableIsVisible" class="display table-bordered"
                :options="options"
           >
                <thead>
                    <tr>
                        <th v-for="col in columns" :key="col">
                            {{ col }}
                        </th>
                    </tr>   
                </thead>
           </data-table>
        </v-col>
    </v-row>
</template>

<script>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

import NooTextField from '../inputs/NooTextField.vue'
import NooSelect from '../inputs/NooSelect.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import DfUnionsDialog from '@/components/dialogs/dfconf/DfUnionsDialog.vue'
import DfJoinsDialog from '@/components/dialogs/dfconf/DfJoinsDialog.vue'

  
DataTable.use(DataTablesCore)

export default {
    name: 'DataframeTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            itemGroup: 'dataframe',
            options: {
                columns: [],
                data: [],
            },
            tableIsVisible: false,
            columns: [],
        }
        tabProps.id = props.id
        tabProps.name = props.name
        const base = props.base
        tabProps.from = base.type
        tabProps.source = base.type === 'query' ? base.source : ''
        tabProps.query = base.type === 'query' ? base.value : ''
        tabProps.expression = base.type === 'expression' ? base.value : ''

        return tabProps
    },
    computed: {
        fromExpression(){
            return this.from === 'expression'
        },
        sources(){
            return Object.values(this.context.sources).map(s => {
                return {
                    value: s.id,
                    text: s.name,
                }
            })
        },
        queries(){
            const srcQueries = Object.values(this.context.queries).filter(q => this.source === q.source)
            return srcQueries.map(q => {
                return {
                    value: q.id,
                    text: q.name,
                }
            })
        },
    },
    methods: {
        updateDf(){
            const df = this.context.updateDataframe(this.id, this.toConf())
            this.updateItem(df)   
        },
        getData(){
            this.enterLoadingState()
            this.dropTable()

            this.api.getDataframeData(this.context.id, this.id)
                .then(res => {
                    if(res.status === 200){
                        this.options.columns = res.data.columns.map(i => {
                            return {data: i.replace('.', '\\.')}
                        })
                        this.columns = res.data.columns.map(i => i)
                        this.options.data = res.data.data
                        this.showTable()
                    }
                }).finally(() => {
                    this.exitLoadingState()
                })
        },
        toConf(){
            const conf = {
                id: this.id,
                name: this.name,
                base: this.getBase(),
                unions: this.$refs.unionsDialog.getItems(),
                joins: this.$refs.joinsDialog.getItems()
            }
            return conf
        },
        getBase(){
            const base = {type: this.from}
            if(this.fromExpression){
                base.value = this.expression
            } else {
                base.source = this.source
                base.value = this.query
            }
            return base
        },
        showTable(){
            this.tableIsVisible = true
        },
        hideTable(){
            this.tableIsVisible = false
        },
        dropTable(){
            this.hideTable()
            this.columns = []
            this.options = {
                columns: [],
                data: [],
            }
        },
    },
    components: {
        NooTextField,
        NooSelect,
        DataTable,
        DfUnionsDialog,
        DfJoinsDialog,
    }
}
</script>

<style>
@import 'datatables.net-dt';
</style>