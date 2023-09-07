<template>
    <base-dialog 
        :title="locale.sources.new" 
        activator-icon="mdi-database-plus"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <v-text-field 
                        :label="locale.sources.name"
                        v-model="name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-select
                        :label="locale.sources.type"
                        v-model="type" 
                        :items="srcTypes" 
                        item-title="text" 
                        item-value="value" />
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
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'

export default {
    name: 'NewSourceDialog',
    data(){
        return {
            id: '',
            name: '',
            type: '',
            from: 'json',
            value: '',
            visible: false,
            srcTypes: [
                {value: 'postgres', text: 'Postgres'},
                {value: 'mysql', text: 'MySQL'},
                {value: 'mssql', text: 'SQL Server'},
                {value: 'redis', text: 'Redis'},
            ]
        }
    },
    inject: ['locale'],
    components: {
        BaseDialog,
    },
}
</script>