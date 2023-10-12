<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.figures.new" 
        activator-icon="mdi-chart-box-plus-outline"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.figures.name"
                        v-model="name" />
                </v-col>
                <v-col cols="12">
                    <noo-select
                        :label="locale.figures.figureType"
                        v-model="type" 
                        :items="figureTypes" />
                </v-col>
                <v-col cols="12">
                    <noo-select
                        :label="locale.figures.from"
                        v-model="from" 
                        :items="fromOptions" />
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn 
                @click="addFigure"
                :disabled="!addBtnIsEnabled">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'
import { figureTypes, fromOptions } from '@/utils/fig.js'

export default {
    name: 'NewFigureDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            name: '',
            type: 'line',
            from: 'dataframe',
            engine: 'plotly',
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
    },
    methods: {
        addFigure(){
            const conf = this.toConf()
            const fig = this.context.addFigure(conf)
            if(this.context.hasId()){
                this.api.partialUpdate(this.context.id, 'figure', fig.id, fig.compile())
                    .then(res => {})
                    .finally(_ => {
                        this.$refs.baseDialog.close()
                    })
            } else {
                this.$refs.baseDialog.close()
            }
        },
        toConf(){
            const figId = `fig${+ new Date()}`
            const conf = {
                type: 'figure',
                figure_type: this.type,
                engine: this.engine,
                id: figId,
                name: this.name,
                base: this.getBase(),
                layout: {
                    showlegend: false,
                    title_text: '',
                },
            }
            return conf
        },
        getBase(){
            const base = {
                from: this.from,
                value: this.from === 'list' ? [] : {
                    df_from: 'dataframe',
                    dataframe: '',
                    ...this.getParams(),
                }
            }
            return base
        },
        getParams(){
            const t = this.type
            if(this.from === 'list'){
                return {}
            }

            if(t === 'line'){
                return {
                    x: '',
                    y: '',
                }
            } else if(t === 'pie'){
                return {
                    names: '',
                    values: '',
                }
            } else if(t === 'bar'){
                return {
                    barmode: 'relative',
                    x: '',
                    y: '',
                }
            }
        },
        reset(){
            this.name = ''
            this.type = 'line'
            this.from = 'dataframe'
        },
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
        addBtnIsEnabled(){
            return this.name.length > 0
        },
    },
    components: {
        NooTextField,
        NooSelect,
    },
}
</script>