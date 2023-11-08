<template>
<v-expansion-panel :title="panelTitle">
    <v-expansion-panel-text>
        <v-row>
            <v-col cols="12">
                <noo-text-field v-model="title" :label="locale.widgets.title" />
            </v-col>
            <v-col cols="12">
                <noo-select v-model="tableId"
                    :label="locale.widgets.table" 
                    :items="tables" />
            </v-col>
        </v-row>
    </v-expansion-panel-text>
</v-expansion-panel>
</template>

<script>
import { widgetSettingsMixin } from '@/utils/mixins/widgets.js'

export default {
    name: 'TableWidgetSettings',
    mixins: [widgetSettingsMixin, ],
    data(){
        const props = this.widget.props

        return {
            title: props.title || '',
            tableId: props.tableId || '',
        }
    },
    computed: {
        tables(){
            return Object.values(this.context.components)
                .filter(c => c.type === 'table')
                .map(t => {
                return {
                    text: t.name,
                    value: t.id,
                }
            })
        },
    },
    watch: {
        title(v){
            this.emitChanged('title', v)
        },
        tableId(v){
            this.emitChanged('tableId', v)
        },
    },
}
</script>