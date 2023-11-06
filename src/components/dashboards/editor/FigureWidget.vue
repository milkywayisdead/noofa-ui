<template>
<div>
</div>
</template>

<script>
import { widgetMixin, draggableWidgetMixin } from '@/utils/mixins/widgets.js'

export default {
    name: 'FigureWidget',
    mixins: [widgetMixin, draggableWidgetMixin],
    data(){
        return {}
    },
}
</script>