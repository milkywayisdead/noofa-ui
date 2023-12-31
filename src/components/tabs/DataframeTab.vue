<template>
    <v-toolbar density="compact">
        <icon-button ref="saveButton"
            icon="mdi-content-save"
            :tooltip="locale.actions.save"
            @click="updateDf" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'dataframes'"
            @item-delete="emitItemDelete($event)"
        />
        <icon-button icon="mdi-play"
            :tooltip="locale.dataframes.run" 
            @click="getData" />
        <df-dtypes-dialog
            :dataframe-id="id"
            @items-updated="updateBuildProp" />
        <df-unions-dialog
            :dataframe-id="id"
            @items-updated="updateBuildProp" />
        <df-joins-dialog
            :dataframe-id="id"
            @items-updated="updateBuildProp" />
        <df-cols-dialog
            :dataframe-id="id"
            @items-updated="updateBuildProp" />
        <df-filters-dialog
            :dataframe-id="id"
            @items-updated="updateBuildProp" />
        <df-ordering-dialog
            :dataframe-id="id"
            @items-updated="updateBuildProp" />
        <df-fillna-dialog
            :dataframe-id="id"
            @items-updated="updateBuildProp" />
        <icon-button icon="mdi-file-delimited"
            :tooltip="locale.export.downloadCsv"
            @click="download('csv')" />
        <icon-button icon="mdi-file-excel"
            :tooltip="locale.export.downloadExcel"
            @click="download('excel')" />
    </v-toolbar>
    <v-row class="mt-2 rigid-row" :id="rowContainerId">
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
                <v-col cols="12" style="overflow: auto">
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
        <v-col cols="9" style="overflow:auto" :id="`${this.id}-container`">
           <data-table v-if="tableIsVisible" class="display table-bordered"
                :options="options"
           >
                <thead>
                    <tr>
                        <th v-for="col in columns" :key="col">
                            <v-icon color="primary">{{ _getDtypeIcon(dtypes[col]) }}</v-icon>
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
import 'datatables.net-buttons'
import 'datatables.net-buttons/js/buttons.html5'
import jszip from 'jszip'

import NooTextField from '../inputs/NooTextField.vue'
import NooSelect from '../inputs/NooSelect.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import { tableExportMixin } from '@/utils/mixins/tables.js'
import DfUnionsDialog from '@/components/dialogs/dfconf/DfUnionsDialog.vue'
import DfJoinsDialog from '@/components/dialogs/dfconf/DfJoinsDialog.vue'
import DfColsDialog from '@/components/dialogs/dfconf/DfColsDialog.vue'
import DfFiltersDialog from '@/components/dialogs/dfconf/DfFiltersDialog.vue'
import DfOrderingDialog from '@/components/dialogs/dfconf/DfOrderingDialog.vue'
import DfFillnaDialog from '@/components/dialogs/dfconf/DfFillnaDialog.vue'
import DfDtypesDialog from '@/components/dialogs/dfconf/DfDtypesDialog.vue'
import IconButton from '@/components/misc/IconButton.vue'
  
DataTable.use(DataTablesCore)
DataTablesCore.Buttons.jszip(jszip)

export default {
    name: 'DataframeTab',
    mixins: [tabMixin, tableExportMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            itemGroup: 'dataframe',
            options: {
                dom: 'lBftip',
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
        tabProps.from = base.type
        tabProps.source = base.type === 'query' ? base.source : ''
        tabProps.query = base.type === 'query' ? base.value : ''
        tabProps.expression = base.type === 'expression' ? base.value : ''

        const buildProps = {}
        for(let prop of ['unions', 'joins', 'filters', 'columns',
            'ordering', 'fillna', 'dtypes']){
            buildProps[prop] = props[prop] ?? []
        }
        tabProps.buildProps = buildProps

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
        saveBtnEnabled(){
            if(this.fromExpression){
                return this.name.length && this.expression.length
            }

            return this.name.length &&
                this.source.length &&
                this.query.length
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
                        this.dtypes = res.data.dtypes
                        this.showTable()

                        this.snackbarOnItemBuildSuccess()

                        this.$nextTick(this._hideExportBtns)
                    }
                }).catch(err => {
                    this.snackbarOnItemBuildError()
                }).finally(() => {
                    this.exitLoadingState()
                })
        },
        toConf(){
            const conf = {
                id: this.id,
                name: this.name,
                base: this.getBase(),
                ...this.buildProps,
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
        updateBuildProp(event){
            const { prop, data } = event
            this.buildProps[prop] = data.filter(item => true)
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
                dom: 'lBftip',
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
    watch: {
        saveBtnEnabled(value){
            this.$refs.saveButton.setEnabledProp(value)
        },
    },
    provide(){
        return {
            buildProps: this.buildProps,
        }
    },
    components: {
        NooTextField,
        NooSelect,
        DataTable,
        DfUnionsDialog,
        DfJoinsDialog,
        DfColsDialog,
        DfFiltersDialog,
        DfOrderingDialog,
        DfFillnaDialog,
        DfDtypesDialog,
        IconButton,
    }
}
</script>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
</style>