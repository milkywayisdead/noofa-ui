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

                <v-col cols="12" v-if="from !== 'list'" class="pa-0">
                    <v-col cols="12">
                        <noo-select
                            :label="locale.figures.dataframe"
                            v-model="dfId" 
                            :items="dataframes" />
                    </v-col>
                    <v-col cols="12" v-if="figureType !== 'pie' && !usingAgg">
                        <noo-text-field
                            v-model="xCol"
                            :label="locale.figures.xCol" />
                    </v-col>
                    <v-col cols="12" v-if="figureType !== 'pie' && !usingAgg">
                        <noo-text-field
                            v-model="yCol"
                            :label="locale.figures.yCol"
                        />
                    </v-col>
                    <v-col cols="12" v-if="figureType === 'pie' && !usingAgg">
                        <noo-text-field
                            v-model="pieNames"
                            :label="locale.figures.pieNames"
                        />
                    </v-col>
                    <v-col cols="12" v-if="figureType === 'pie' && !usingAgg">
                        <noo-text-field
                            v-model="pieValues"
                            :label="locale.figures.pieValues"
                        />
                    </v-col>
                    <v-col cols="12" v-if="figureType === 'line'">
                        <noo-text-field
                            :label="locale.figures.lineGroup"
                            v-model="lineGroup" />
                    </v-col>
                    <v-col cols="12" v-if="figureType !== 'line'">
                        <v-checkbox v-model="useAgg"
                            :label="locale.figures.aggDf" hide-details />
                    </v-col>
                    <v-col cols="12" v-if="useAgg && figureType !== 'line'" class="pa-0">
                        <v-col cols="12">
                            <noo-text-field :label="locale.figures.groupby"
                                v-model="groupby" />
                        </v-col>
                        <v-col cols="12">
                            <noo-select :label="locale.figures.aggfunc"
                                v-model="aggFunc" 
                                :items="aggfuncs" />
                        </v-col>
                        <v-col cols="12">
                            <noo-text-field :label="locale.figures.aggOn"
                                v-model="aggOn" />
                        </v-col>
                    </v-col>
                    <v-col cols="12" v-if="figureType === 'bar'">
                        <noo-select :label="locale.figures.orientation"
                            v-model="orientation" 
                            :items="orientations" />
                    </v-col>
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
        <v-col cols="9" :id="figureContainerId">
        </v-col>
    </v-row>
</template>

<script>
import NooTextField from '../inputs/NooTextField.vue'
import NooSelect from '../inputs/NooSelect.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import { figureTypes, fromOptions, plotlyUtils, orientations } from '@/utils/fig.js'
import DatasetsDialog from '@/components/dialogs/figconf/DatasetsDialog.vue'
import { aggFuncs } from '@/utils/agg.js'

export default {
    name: 'FigureTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps
        let f = props.base.from
        const usingXY = ['bar', 'line', 'hbar'].includes(props.figure_type) && f !== 'agg'
        const usingAgg = f === 'agg'
        
        if(f === 'grouped' || usingAgg){
            f = 'dataframe'
        }

        const ft = props.figure_type
        const hBar = ft === 'hbar'

        const tabProps = {
            itemGroup: 'figure',
            id: props.id,
            name: props.name,
            type: 'figure',
            figureType: hBar ? 'bar' : props.figure_type,
            engine: this.engine,
            from: f,
            xCol: usingXY ? props.base.x : '',
            yCol: usingXY ? props.base.y : '',
            xFrom: 'expression',
            yFrom: 'expression',
            pieNames: ft === 'pie' ? props.base.names : '',
            pieValues: ft === 'pie' ? props.base.values : '',
            lineGroup: props.base.from === 'grouped' ? props.base.line_group : '',
            datasets: props.base.from === 'list' ? props.base.value : [],
            //base: props.base,
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
            aggfuncs: aggFuncs.map(af => {
                return {
                    text: this.locale.aggFuncs[af],
                    value: af,
                }
            }),
            orientations: orientations.map(o => {
                return {
                    text: this.locale.figures.orientations[o],
                    value: o,
                }
            }),
            orientation: hBar ? 'h' : 'v',

            figureContainerId: `fig-container-${+ new Date()}`,
            useAgg: usingAgg,
            groupby: usingAgg ? props.base.value.groupby.join(',') : '',
            aggOn: usingAgg ? props.base.value.on : '',
            aggFunc: usingAgg ? props.base.value.func : 'count',
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
                    value: df.id,
                    text: df.name,
                }
            })
        },
        aggAvailable(){
            return ['bar', 'pie'].includes(this.figureType)
        },
        usingAgg(){
            return this.useAgg
        },
        usingLineGroup(){
            return this.lineGroup.length > 0
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
                        plotlyUtils.create(
                            this.figureContainerId,
                            res.data.data,
                        )
                    }
                }).finally(() => {
                    this.exitLoadingState()
                })
        },
        toConf(){
            let ft = this.figureType
            if(this.figureType === 'bar' && this.orientation === 'h'){
                ft = 'hbar'
            }

            const conf = {
                id: this.id,
                type: this.type,
                name: this.name,
                figure_type: ft,
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
            } else if(f === 'dataframe' && !this.usingAgg){
                value = {
                    df_from: this.dfFrom,
                    dataframe: this.dfId,
                }
            } else if(f === 'dataframe' && this.usingAgg){
                value = {
                    df_from: this.dfFrom,
                    dataframe: this.dfId,
                    groupby: this.groupby.split(',').map(i => i.trim()),
                    on: this.aggOn,
                    func: this.aggFunc,
                }
            }

            const base = {
                from: f,
                value: value,
            }

            if(['line', 'bar'].includes(this.figureType) && this.from !== 'list'){
                base.x = this.xCol
                base.y = this.yCol
                if(this.figureType === 'line' && this.usingLineGroup){
                    base.from = 'grouped'
                    base.line_group = this.lineGroup
                }
            }

            if(this.figureType === 'bar'){
                base.barmode = 'relative'
            }
            
            if(this.figureType === 'pie' && this.from !== 'list'){
                base.names = this.pieNames
                base.values = this.pieValues
            }

            if(this.usingAgg){
                base.from = 'agg'
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

            this.useAgg = false
        },
        figureType(ft){
            this.useAgg = false

            if(ft === 'pie'){
                this.$refs.datasetsDialog.usingXY = false
            } else {
                this.$refs.datasetsDialog.usingXY = true
            }
        },
    },
    components: {
        NooTextField,
        NooSelect,
        DatasetsDialog,
    }
}
</script>