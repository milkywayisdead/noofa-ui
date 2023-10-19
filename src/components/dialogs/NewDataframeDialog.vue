<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.dataframes.new" 
        activator-icon="mdi-table-large-plus"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.dataframes.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-radio-group 
                        v-model="from"
                        :label="locale.dataframes.from">
                        <v-radio :label="locale.dataframes.fromQuery" value="query"></v-radio>
                        <v-radio :label="locale.dataframes.fromExpression" value="expression"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row v-if="fromExpression">
                <v-col cols="12">
                    <v-textarea
                        :label="locale.dataframes.expression"
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
        </template>
        <template v-slot:actions>
            <v-btn :disabled="!saveBtnEnabled"
                @click="addDataframe">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'
import sources from '@/utils/sources.js'
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'NewDataframeDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            id: '',
            name: '',
            from: 'query',
            source: '',
            query: '',
            expression: '',
            visible: false,
        }
    },
    methods: {
        addDataframe(){
            const conf = this.toConf()
            const df = this.context.addDataframe(conf)
            if(this.context.hasId()){
                this.api.partialUpdate(this.context.id, 'dataframe', df.id, df.compile())
                    .then(res => {})
                    .finally(_ => {
                        this.$refs.baseDialog.close()
                    })
            } else {
                this.$refs.baseDialog.close()
            }
        },
        toConf(){
            const dfId = `df${+ new Date()}`
            const conf = {
                id: dfId,
                name: this.name,
                base: this.getBase(),
            }
            return conf;
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
        reset(){
            for(let prop of [
                'name', 'source', 'query', 'expression'
            ]){
                this[prop] = ''
            }
            this.from = 'query'
        },
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
                return this.name.length &&
                    this.expression.length
            }

            return this.name.length &&
                this.source.length &&
                this.query.length
        },
    },
    watch: {
        source(){
            this.query = ''
        },
    },
    components: {
        NooTextField,
        NooSelect,
    },
}
</script>