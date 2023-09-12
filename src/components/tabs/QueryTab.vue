<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save" 
            @click="updateQuery" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'queries'"
            @item-delete="emitItemDelete($event)"
        />
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
import { tabMixin } from '@/utils/mixins/tabs'

export default {
    name: 'QueryTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            itemGroup: 'query',
        }
        for(let p of [
            'id', 'name', 'from', 'expression', 'source',
        ]){
            tabProps[p] = props[p] ?? ''
        }

        return tabProps
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
    methods: {
        updateQuery(){
            const query = this.context.updateQuery(this.id, this.toConf())
            this.updateItem(query)   
        },
        getData(){
            this.api.getQueryData(this.context.id, this.id)
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data)
                    }
                })
        },
        toConf(){
            const conf = {}
            for(let prop of [
                'id', 'name', 'from', 'source', 'expression',
            ]){
                conf[prop] = this[prop]
            }
            return conf
        },
    },
    components: {
        NooTextField,
        NooSelect,
    }
}
</script>