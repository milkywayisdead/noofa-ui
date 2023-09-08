<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save" 
            @click="save" />
        <v-btn icon="mdi-delete" 
            @click="delete" />
        <v-btn icon="mdi-connection"
            @click="testConnection" />
    </v-toolbar>
    <v-row class="mt-2">
        <v-col cols="3">
            <v-row>
                <v-col cols="12">
                    <noo-text-field
                        v-model="name"
                        :label="locale.sources.name"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <noo-select
                        v-model="type"
                        :label="locale.sources.type"
                        :items="sourceTypes"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-radio-group 
                        v-model="from"
                        :label="locale.sources.from">
                        <v-radio :label="locale.sources.params" value="json"></v-radio>
                        <v-radio :label="locale.sources.connStr" value="conn_str"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row v-if="usingConnStr">
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.sources.connStr"
                        v-model="connStr" />
                </v-col>
            </v-row>
            <div v-if="!usingConnStr">
                <v-row>
                    <v-col cols="12">
                        <noo-text-field 
                            :label="locale.sources.host"
                            v-model="host" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <noo-text-field 
                            :label="locale.sources.port"
                            v-model="port" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <noo-text-field 
                            :label="locale.sources.db"
                            v-model="dbName" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <noo-text-field 
                            :label="locale.sources.user"
                            v-model="user" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <noo-text-field 
                            :label="locale.sources.password"
                            v-model="password" />
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import sources from '@/utils/sources.js'
import NooTextField from '../inputs/NooTextField.vue'
import NooSelect from '../inputs/NooSelect.vue'

export default {
    name: 'SourceTab',
    data(){
        const props = this.itemProps
        const tabProps = {sourceTypes: sources}
        for(let p of [
            'id', 'name', 'type', 'from',
            'host', 'port', 'user', 'password',
            'dbName', 'connStr'
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
        usingConnStr(){
            return this.from === 'conn_str'
        },
    },
    methods: {
        save(){},
        delete(){},
        testConnection(){},
    },
    components: {
        NooTextField,
        NooSelect,
    }
}
</script>