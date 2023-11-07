<template>
<div :id="id"
    class="noo-widget"
    :style="positionStyle + sizeStyle"
    @click="select"
    @contextmenu.prevent="contextMenu"
    @mousedown="select(), startDragging($event)">
    <v-card class="noo-table-widget-card">
        <v-card-title class="prevent-select">{{ title }}</v-card-title>
        <v-card-text>

        </v-card-text>
    </v-card>
</div>
<widget-resizers v-if="editorMode && selected"
    ref="resizers"
    :widget="this" />
</template>

<script>
import { widgetMixin, draggableWidgetMixin } from '@/utils/mixins/widgets.js'

export default {
    name: 'TableWidget',
    mixins: [widgetMixin, draggableWidgetMixin],
    data(){
        const props = this.widgetProps

        return {
            type: 'table',
            tableId: props.props.tableId || '',
            title: props.props.title || '',
        }
    },
    methods: {
        getWidgetProps(){
            return {
                id: this.id,
                type: this.type,
                props: {
                    title: this.title,
                    tableId: this.tableId,
                },
                layout: this.layoutProps,
            }
        },
    },
}
</script>