<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save" 
            @click="save" />
        <v-btn icon="mdi-delete" 
            @click="delete" />
        <v-btn icon="mdi-play" 
            @click="getData" />
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
                    <noo-select
                        v-model="source"
                        :label="locale.queries.source"
                        :items="sources"
                    />
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
            <div v-if="!expression">
            </div>
        </v-col>
    </v-row>
</template>

<script>
import NooTextField from '../inputs/NooTextField.vue'
import NooSelect from '../inputs/NooSelect.vue'

export default {
    name: 'QueryTab',
    data(){
        const props = this.itemProps
        const tabProps = {}
        for(let p of [
            'id', 'name', 'from', 'expression', 'source',
        ]){
            tabProps[p] = props[p] ?? ''
        }

        return tabProps
    },
    props: {
        itemProps: {
            type: Object,
        }
    },
    inject: ['locale', 'context', 'api'],
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
    methods: {
        save(){},
        delete(){},
        getData(){},
    },
    components: {
        NooTextField,
        NooSelect,
    }
}
</script>