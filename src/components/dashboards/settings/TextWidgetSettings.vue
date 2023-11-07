<template>
<v-expansion-panel :title="panelTitle">
    <v-expansion-panel-text>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="text"
                    :label="locale.widgets.text"
                    hide-details 
                    density="compact" />
            </v-col>
            <v-col cols="12">
                <v-checkbox 
                    v-model="interprete"
                    :label="locale.widgets.interprete" 
                    hide-details 
                    density="compact" />
            </v-col>
            <v-col cols="12">
                <noo-select v-model="fontSize"
                    :label="locale.widgets.fontSize" 
                    :items="fontSizes" />
            </v-col>
            <v-col cols="12">
                <v-color-picker hide-inputs v-model="fontColor" />
            </v-col>
        </v-row>
        
    </v-expansion-panel-text>
</v-expansion-panel>
</template>

<script>
import { widgetSettingsMixin } from '@/utils/mixins/widgets.js'

export default {
    name: 'TextWidgetSettings',
    mixins: [widgetSettingsMixin, ],
    data(){
        const props = this.widget.props

        return {
            text: props.text || '',
            interprete: props.interprete || false,
            fontSize: props.fontSize || 12,
            fontColor: props.fontColor || '#333',
            fontSizes: [8, 10, 12, 16, 18, 20, 24, 28, 32, 36, 40, 48, 50, 54, 60, 72].map(f => {
                return {
                    text: f,
                    value: f,
                }
            }),
        }
    },
    watch: {
        text(v){
            this.emitChanged('text', v)
        },
        interprete(v){
            this.emitChanged('interprete', v)
        },
        fontSize(v){
            this.emitChanged('fontSize', v)
        },
        fontColor(v){
            this.emitChanged('fontColor', v)
        },
    },
}
</script>