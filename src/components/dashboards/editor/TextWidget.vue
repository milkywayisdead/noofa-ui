<template>
<div :id="id"
    class="noo-widget"
    :style="positionStyle + sizeStyle"
    @click="select"
    @contextmenu.prevent="contextMenu"
    @mousedown="select(), startDragging($event)">
    <textarea class="noo-text-widget"
        readonly
        :style="fontStyle"
        :value="actualText" />
</div>
<widget-resizers v-if="editorMode && selected"
    ref="resizers"
    :widget="this" />
</template>

<script>
import { widgetMixin, draggableWidgetMixin } from '@/utils/mixins/widgets.js'

export default {
    name: 'TextWidget', 
    mixins: [widgetMixin, draggableWidgetMixin],
    data(){
        const props = this.widgetProps

        return {
            type: 'text',
            text: props.props.text || '',
            interprete: props.props.interprete || false,
            fontSize: props.props.fontSize || 12,
            fontColor: props.props.fontColor || '#333',
        }
    },
    computed: {
        fontStyle(){
            return `font-size:${this.fontSize}px;color:${this.fontColor};`
        },
        actualText(){
            return this.interprete ? `=<${this.text}>` : this.text
        },
    },
    mounted(){
        this.getWidgetData()
    },
    methods: {
        getWidgetProps(){
            return {
                id: this.id,
                type: this.type,
                props: {
                    text: this.text,
                    interprete: this.interprete,
                    fontSize: this.fontSize,
                    fontColor: this.fontColor,
                },
                layout: this.layoutProps,
            }
        },
        updateContent(data){},
    },
}
</script>