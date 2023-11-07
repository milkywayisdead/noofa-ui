<template>
<v-expansion-panel :title="panelTitle">
    <v-expansion-panel-text>
        <v-row>
            <v-col cols="12">
                <noo-text-field v-model="title" :label="locale.widgets.title" />
            </v-col>
            <v-col cols="12">
                <noo-select v-model="figureId"
                    :label="locale.widgets.figure" 
                    :items="figures" />
            </v-col>
        </v-row>
    </v-expansion-panel-text>
</v-expansion-panel>
</template>

<script>
import { widgetSettingsMixin } from '@/utils/mixins/widgets.js'

export default {
    name: 'FigureidgetSettings',
    mixins: [widgetSettingsMixin, ],
    data(){
        const props = this.widget.props

        return {
            title: props.title || '',
            figureId: props.figureId || '',
        }
    },
    computed: {
        figures(){
            return Object.values(this.context.components)
                .filter(c => c.type === 'figure')
                .map(f => {
                return {
                    text: f.name,
                    value: f.id,
                }
            })
        },
    },
    watch: {
        title(v){
            this.emitChanged('title', v)
        },
        figureId(v){
            this.emitChanged('figureId', v)
        },
    },
}
</script>