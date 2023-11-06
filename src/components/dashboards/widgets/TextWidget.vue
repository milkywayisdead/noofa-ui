<template>
<div :id="id"
    class="noo-widget"
    :style="positionStyle + sizeStyle"
    @click="select"
    @contextmenu.prevent="contextMenu"
    @mousedown="select(), startDragging($event)">
    <textarea class="noo-text-widget" readonly>
        HELLO WORDL
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
        return {}
    },
}
</script>