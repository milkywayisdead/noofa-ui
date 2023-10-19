<template>
    <v-toolbar density="compact">
        <v-btn icon="mdi-content-save"
            :disabled="!saveBtnEnabled"
            @click="updateSource" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="itemGroup + 's'"
            @item-delete="emitItemDelete($event)"
        />
        <v-btn icon="mdi-connection"
            @click="testConnection" />
        <v-btn icon="mdi-database-eye" 
            @click="$emit('enter-loading-state'), getDbStructure(this.id)" />
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
                            v-model="dbname" />
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
        <v-col cols="9">
            <db-struct-area ref="dbStruct" />
        </v-col>
    </v-row>
</template>

<script>
import { tabMixin } from '@/utils/mixins/tabs'
import { dbExplorerMixin } from '@/utils/mixins/sources'
import sources from '@/utils/sources.js'
import NooTextField from '../inputs/NooTextField.vue'
import NooSelect from '../inputs/NooSelect.vue'
import DbStructArea from '@/components/dbstruct/DbStructArea.vue'

export default {
    name: 'SourceTab',
    mixins: [tabMixin, dbExplorerMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            sourceTypes: sources,
            itemGroup: 'source',
        }
        for(let p of [
            'id', 'name', 'type', 'from',
        ]){
            tabProps[p] = props[p] ?? ''
        }

        if(tabProps.from === 'conn_str'){
            tabProps.connStr = props.connStr
            for(let p of [
                'host', 'port', 'user', 'password', 'dbname',
            ]){
                tabProps[p] = ''
            }
        } else {
            tabProps.connStr = ''
            for(let p of [
                'host', 'port', 'user', 'password', 'dbname',
            ]){
                tabProps[p] = props[p]
            }
        }

        return tabProps
    },
    computed: {
        usingConnStr(){
            return this.from === 'conn_str'
        },
        saveBtnEnabled(){
            if(this.usingConnStr){
                return this.name.length && this.connStr.length
            }

            return this.name.length &&
                this.host.length &&
                this.port.length &&
                this.dbname.length
        },
    },
    methods: {
        updateSource(){
            const source = this.context.updateSource(this.id, this.toConf())
            this.updateItem(source)      
        },
        testConnection(){
            this.api.testConnection(this.context.id, this.id)
                .then(res => {
                    if(res.status === 200){
                        alert(res.data.result)
                    }
                })
        },
        toConf(){
            const conf = {id: this.id}
            for(let prop of [
                'name', 'type', 'from',
                'host', 'port', 'dbname',
                'user', 'password', 'connStr',
            ]){
                conf[prop] = this[prop]
            }
            return conf
        },
        onDbStructureLoaded(response){
            const data = response.data.db
            const dbTables = this.$refs.dbStruct.setIds(data.tables)
            this.$refs.dbStruct.tables = dbTables
            this.$refs.dbStruct.relations = data.relations
            this.$refs.dbStruct.resize()
            this.$emit('exit-loading-state')
        },
    },
    components: {
        NooTextField,
        NooSelect,
        DbStructArea,
    }
}
</script>