<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.queries.new" 
        activator-icon="mdi-database-search"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.queries.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <noo-select
                        :label="locale.queries.source"
                        v-model="source" 
                        :items="sources" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-radio-group 
                        v-model="from"
                        :label="locale.queries.from">
                        <v-radio :label="locale.queries.expression" value="expression"></v-radio>
                        <v-radio :label="locale.queries.constructor" value="json" disabled></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row v-if="usingExpression">
                <v-col cols="12">
                    <v-textarea
                        :label="locale.queries.expression"
                        v-model="expression" />
                </v-col>
            </v-row>
            <div v-if="!usingExpression">
            </div>
        </template>
        <template v-slot:actions>
            <v-btn @click="addQuery">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'
import NooTextField from '@/components/inputs/NooTextField.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'

export default {
    name: 'NewQueryDialog',
    data(){
        return {
            name: '',
            from: 'expression',
            expression: '',
            source: '',
        }
    },
    inject: ['context', 'locale'],
    methods: {
        addQuery(){
            const conf = this.toConf()
            this.context.addQuery(conf)
            this.$refs.baseDialog.close()
        },
        toConf(){
            const qId = `qr${+ new Date()}`
            const conf = {id: qId}
            for(let prop of [
                'name', 'from', 'expression', 'source',
            ]){
                conf[prop] = this[prop]
            }
            return conf;
        },
        reset(){
            for(let prop of [
                'name', 'from', 'expression', 'source',
            ]){
                this[prop] = ''
            }
        },
    },
    computed: {
        usingExpression(){
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
    },
    components: {
        BaseDialog,
        NooTextField,
        NooSelect,
    },
}
</script>