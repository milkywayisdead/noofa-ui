<template>
<div :id="id"
    class="noo-widget"
    :style="positionStyle"
    @click="select">
    <textarea class="noo-text-widget" readonly>
        HELLO WORDL
    </textarea>
</div>
<widget-resizers v-if="editorMode && selected"
    ref="resizers"
    :widget="this" />
</template>

<script>
import WidgetMixin from '@/utils/mixins/widgets.js'

export default {
    name: 'TextWidget', 
    mixins: [WidgetMixin, ],
    data(){
        return {}
    },
}
</script>