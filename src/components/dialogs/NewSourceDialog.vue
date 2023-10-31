<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.sources.new" 
        activator-icon="mdi-database-plus"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.sources.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <noo-select
                        :label="locale.sources.type"
                        v-model="type" 
                        :items="srcTypes" />
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
        </template>
        <template v-slot:actions>
            <v-btn :disabled="!saveBtnEnabled"
                @click="addSource">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'
import sources from '@/utils/sources.js'
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'NewSourceDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            id: '',
            name: '',
            type: 'postgres',
            from: 'json',
            host: '',
            port: '',
            user: '',
            password: '',
            dbname: '',
            connStr: '',
            visible: false,
            srcTypes: sources,
        }
    },
    methods: {
        addSource(){
            const conf = this.toConf()
            const source = this.context.addSource(conf)
            if(this.context.hasId()){
                this.api.partialUpdate(this.context.id, 'source', source.id, source.compile())
                    .then(res => {})
                    .catch(err => {
                        this.snackbar.error(
                            this.locale.messages.errorWhenSavingSource
                        )
                    })
                    .finally(_ => {
                        this.$refs.baseDialog.close()
                    })
            } else {
                this.$refs.baseDialog.close()
            }
        },
        toConf(){
            const srcId = `src${+ new Date()}`
            const conf = {id: srcId}
            for(let prop of [
                'name', 'type', 'from',
                'host', 'port', 'dbname',
                'user', 'password', 'connStr',
            ]){
                conf[prop] = this[prop]
            }
            return conf;
        },
        reset(){
            for(let prop of [
                'name', 'host', 'port',
                'user', 'password', 'connStr',
                'dbname',
            ]){
                this[prop] = ''
            }
            this.type = 'postgres'
            this.from = 'json'
        },
    },
    computed: {
        usingConnStr(){
            return this.from === 'conn_str'
        },
        saveBtnEnabled(){
            if(this.usingConnStr){
                return this.name.length &&
                    this.connStr.length
            }

            return this.name.length &&
                this.host.length &&
                this.port.length &&
                this.dbname.length
        },
    },
    components: {
        NooTextField,
        NooSelect,
    },
}
</script>