<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save" 
            @click="updateTable" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'tables'"
            @item-delete="emitItemDelete($event)"
        />
        <v-btn icon="mdi-play" 
            @click="getData" />
        <table-exclude-dialog
            @items-updated="updateLayoutProp" />
        <table-aliases-dialog
            @items-updated="updateLayoutProp" />
    </v-toolbar>
    <v-row class="mt-2">
        <v-col cols="3">
            <v-row>
                <v-col cols="12">
                    <noo-text-field
                        v-model="name"
                        :label="locale.tables.name"
                    />
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
                            v-model="dataframe"
                            :items="dataframes" />
                    </v-col>
                </v-row>
            </div>
            <v-row>
                <v-col cols="12">
                    <noo-text-field
                        v-model="layoutProps.title_text"
                        :label="locale.tables.title"
                    />
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="9" style="overflow:auto">
           <data-table v-if="tableIsVisible" class="display table-bordered"
                :options="options"
           >
                <thead>
                    <tr>
                        <th v-for="col in columns" :key="col">
                            <v-icon v-if="false" color="primary">{{ _getDtypeIcon(dtypes[col]) }}</v-icon>
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
import TableExcludeDialog from '@/components/dialogs/tableconf/TableExcludeDialog.vue'
import TableAliasesDialog from '@/components/dialogs/tableconf/TableAliasesDialog.vue'
  
DataTable.use(DataTablesCore)

export default {
    name: 'TableTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            itemGroup: 'table',
            options: {
                columns: [],
                data: [],
                order: [],
            },
            tableIsVisible: false,
            columns: [],
            dtypes: {},
        }
        tabProps.id = props.id
        tabProps.name = props.name
        const base = props.base
        tabProps.from = base.from
        tabProps.dataframe = base.from === 'dataframe' ? base.value : ''
        tabProps.expression = base.from === 'expression' ? base.value : ''

        const lo = props.layout
        const layoutProps = {
            title_text: lo.title_text ?? '',
            exclude: lo.exclude ?? [],
            aliases: lo.aliases ?? {},
        }
        tabProps.layoutProps = layoutProps

        return tabProps
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
    },
    methods: {
        updateTable(){
            const table = this.context.updateTable(this.id, this.toConf())
            this.updateItem(table)   
        },
        getData(){
            this.enterLoadingState()
            this.dropTable()

            this.api.getTableData(this.context.id, this.id)
                .then(res => {
                    if(res.status === 200){
                        this.options.columns = res.data.columns.map(i => {
                            return {data: i.replace('.', '\\.')}
                        })
                        this.columns = res.data.columns.map(i => i)
                        this.options.data = res.data.data
                        this.dtypes = res.data.dtypes
                        this.showTable()
                    }
                }).finally(() => {
                    this.exitLoadingState()
                })
        },
        toConf(){
            const conf = {
                id: this.id,
                type: 'table',
                name: this.name,
                base: this.getBase(),
                layout: this.layoutProps,
            }
            return conf
        },
        getBase(){
            const base = {
                from: this.from,
                value: this.fromExpression ? this.expression : this.dataframe
            }
            return base
        },
        updateLayoutProp(event){
            const { prop, data } = event

            if(Array.isArray(data)){
                this.layoutProps[prop] = data.filter(item => true)
            } else {
                this.layoutProps[prop] = data
            }
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
                order: [],
            }
            this.dtypes = {}
        },
        _getDtypeIcon(dtypeStr){
            if(dtypeStr === 'object'){
                return 'mdi-alphabetical'
            }
            if(dtypeStr.startsWith('int') || dtypeStr.startsWith('float')){
                return 'mdi-numeric'
            }
            if(dtypeStr.startsWith('datetime')){
                return 'mdi-calendar-clock'
            }
        },
    },
    provide(){
        return {
            buildProps: this.layoutProps,
        }
    },
    components: {
        NooTextField,
        NooSelect,
        DataTable,
        TableExcludeDialog,
        TableAliasesDialog,
    }
}
</script>

<style>
@import 'datatables.net-dt';
</style>