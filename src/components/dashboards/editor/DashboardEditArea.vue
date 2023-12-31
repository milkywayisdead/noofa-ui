<template>
<div :id="containerId"
    :style="containerHeight"
    style="outline: 1px solid black;padding:4px;overflow:scroll;">
    <div :style="bgSize + areaSize" class="edit-area" @click.self="unselectWidget">
        <component v-for="(widget, wId) in widgets"
            :key="wId"
            :is="`${widget.type}-widget`"
            :widget-props="widget.props"
            mode="edit"
            @selected="selectWidget"
            @delete="deleteWidget" />
    </div>
</div>
</template>

<script>
import TextWidget from './TextWidget.vue'
import TableWidget from './TableWidget.vue'
import FigureWidget from './FigureWidget.vue'

export default {
    name: 'DashboardEditArea',
    data(){
        return {
            cellSize: 20,
            width: 0,
            height: 0,
            _containerHeight: 0,
            containerId: `dash-ea-${+ new Date()}`,
            widgets: {},
            selectedWidget: null,

            bindToGrid: false,
            widgetObjects: {},
        }
    },
    computed: {
        bgSize(){
            return `background-size: ${this.cellSize}px ${this.cellSize}px;`
        },
        bgImage(){
            return  `background-image:${[
                'linear-gradient(to right, grey 1px, transparent 1px)',
                'linear-gradient(to bottom, grey 1px, transparent 1px);'
            ].join(',')}`
        },
        areaSize(){
            return `height:${this.height}px;width:${this.width}px;`
        },
        containerHeight(){
            return `height:${this._containerHeight}px;`
        },
    },
    emits: ['widget-selected', 'widget-unselected',],
    methods: {
        setSize(w, h){
            this.width = w
            this.height = h
        },
        setContainerHeight(h){
            this._containerHeight = h
        },
        addWidget(type, props=null){
            const id = props ? props.id : `${type}-w-${+ new Date()}`
            props = props || {
                id: id,
                props: {},
                layout: {},
            }
            this.widgets[id] = {
                type: type,
                props: props,
            }
        },
        addWidgetObject(wo){
            this.widgetObjects[wo.id] = wo
        },
        getWidgets(){
            const widgets = {}
            for(let w of Object.values(this.widgetObjects)){
                widgets[w.id] = w.getWidgetProps()
            }
            return widgets
        },
        selectWidget(e){
            if(this.selectedWidget && this.selectedWidget !== e){
                this.selectedWidget.unselect()
                this.selectedWidget = null
            }

            this.selectedWidget = e
            this.$emit('widget-selected', e)
        },
        unselectWidget(){
            if(this.selectedWidget){
                this.selectedWidget.unselect()
                this.selectedWidget = null
                this.$emit('widget-unselected')
            }
        },
        deleteWidget(widgetId){
            delete this.widgets[widgetId]
            delete this.widgetObjects[widgetId]
            this.unselectWidget()
        },
        getShape(){
            return {
                width: this.width,
                height: this.height
            }
        },
        getClosestIntersect(x, y){
            const cxN = x / this.cellSize
            const cyN = y / this.cellSize
            const resX = cxN % 1 > 0.5 ? Math.ceil(cxN)*this.cellSize : Math.floor(cxN)*this.cellSize
            const resY = cyN % 1 > 0.5 ? Math.ceil(cyN)*this.cellSize : Math.floor(cyN)*this.cellSize

            return {
                x: resX,
                y: resY,
            }
        },
    },
    provide(){
        return {
            editArea: this,
        }
    },
    components: {
        TextWidget,
        TableWidget,
        FigureWidget,
    },
}
</script>

<style scoped>
.edit-area {
    background: #a8a5a51f;
    background-image:
        linear-gradient(to right, grey 1px, transparent 1px),
        linear-gradient(to bottom, grey 1px, transparent 1px);
    position: relative;
    z-index: 1;
}
</style>