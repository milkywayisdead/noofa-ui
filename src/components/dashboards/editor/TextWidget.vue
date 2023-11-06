<template>
<div :id="id"
    class="noo-widget"
    :style="positionStyle + sizeStyle"
    @click="select"
    @contextmenu.prevent="contextMenu"
    @mousedown="select(), startDragging($event)">
    <textarea class="noo-text-widget" readonly :style="fontStyle">
        {{ text }}
    </textarea>
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

            top: props.layout.top || 0,
            left: props.layout.left || 0,
            height: props.layout.height || 0,
            width: props.layout.width || 0,
        }
    },
    computed: {
        fontStyle(){
            return `font-size:${this.fontSize}px;color:${this.fontColor};`
        },
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
    },
}
</script>