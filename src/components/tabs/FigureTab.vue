<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save" 
            @click="updateFigure" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'figures'"
            @item-delete="emitItemDelete($event)"
        />
        <v-btn icon="mdi-play" 
            @click="getFigure" />
        <datasets-dialog ref="datasetsDialog" 
            @datasets-updated="updateDatasets" />
    </v-toolbar>
    <v-row class="mt-2">
        <v-col cols="3">
            <v-row>
                <v-col cols="12">
                    <noo-text-field
                        v-model="name"
                        :label="locale.figures.name"
                    />
                </v-col>
                <v-col cols="12">
                    <noo-select
                        :label="locale.figures.figureType"
                        v-model="figureType" 
                        :items="figureTypes" />
                </v-col>
                <v-col cols="12">
                    <noo-select
                        :label="locale.figures.from"
                        v-model="from" 
                        :items="fromOptions" />
                </v-col>
                <v-col cols="12">
                    <noo-text-field
                        v-model="title_text"
                        :label="locale.figures.titleText"
                    />
                </v-col>
                <v-col cols="12">
                    <v-checkbox 
                        v-model="showlegend"
                        :label="locale.figures.showLegend" />
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="9" style="overflow:auto">
        </v-col>
    </v-row>
</template>

<script>
import NooTextField from '../inputs/NooTextField.vue'
import NooSelect from '../inputs/NooSelect.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import { figureTypes, fromOptions } from '@/utils/fig.js'
import DatasetsDialog from '@/components/dialogs/figconf/DatasetsDialog.vue'

export default {
    name: 'FigureTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps

        const tabProps = {
            itemGroup: 'figure',
            id: props.id,
            name: props.name,
            type: 'figure',
            figureType: props.figure_type,
            engine: this.engine,
            from: props.base.from,
            xCol: '',
            yCol: '',
            xFrom: 'expression',
            yFrom: 'expression',
            pieNames: '',
            pieValues: '',
            lineGroup: '',
            datasets: props.base.from === 'list' ? props.base.value : [],
            base: props.base,
            dfFrom: props.base.value?.df_from ?? 'dataframe',
            dfId: props.base.value?.df_from === 'dataframe' ? props.base.value.dataframe : '',
            ...props.layout,

            figureTypes: figureTypes.map(ft => {
                return {
                    text: this.locale.figures.figureTypes[ft],
                    value: ft,
                }
            }),
            fromOptions: fromOptions.map(fo => {
                return {
                    text: this.locale.figures.fromOptions[fo],
                    value: fo,
                }
            }),
        }

        return tabProps
    },
    mounted(){
        this.$refs.datasetsDialog.activatorDisabled = this.from !== 'list'
                
        if(this.from === 'list'){
            this.$refs.datasetsDialog.datasets = this.datasets.filter(ds => true)
            this.$refs.datasetsDialog.updateList()
        }
    },
    computed: {
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
        updateFigure(){
            const fig = this.context.updateFigure(this.id, this.toConf())
            this.updateItem(fig)   
        },
        getFigure(){
            this.enterLoadingState()

            this.api.getFigureData(this.context.id, this.id)
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
                type: this.type,
                name: this.name,
                figure_type: this.figureType,
                engine: this.engine,
                base: this.getBase(),
                layout: this.getLayoutProps(),
            }
            return conf
        },
        getBase(){
            let value
            const f = this.from
            if(f === 'list'){
                value = this.datasets
            } else if(f === 'dataframe' || f === 'grouped'){
                value = {
                    df_from: this.dfFrom,
                    dataframe: this.dfId,
                }
            } else if(f === 'agg'){
                value = {
                    df_from: this.dfFrom,
                    dataframe: this.dfId,
                    groupby: [],
                    on: '',
                    func: '',
                }
            }

            const base = {
                from: f,
                value: value,
            }

            if(['line', 'bar'].includes(this.figureType) && this.from !== 'list'){
                base.x = this.xCol
                base.y = this.yCol
                if(this.figureType === 'bar'){
                    base.barmode = 'relative'
                }
                if(this.figureType === 'line' && this.lineGroup){
                    base.line_group = this.lineGroup
                }
            }

            return base
        },
        getLayoutProps(){
            return {
                title_text: this.title_text,
                showlegend: this.showlegend,
            }
        },
        updateDatasets(value){
            this.datasets = value.filter(i => true)
        },
    },
    watch: {
        from(value){
            this.$refs.datasetsDialog.activatorDisabled = value !== 'list'
        },
    },
    components: {
        NooTextField,
        NooSelect,
        DatasetsDialog,
    }
}
</script>