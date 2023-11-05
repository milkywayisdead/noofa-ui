<template>
<div :id="containerId"
    :style="containerHeight"
    style="outline: 1px solid black;padding:4px;overflow:scroll;">
    <div :style="bgSize + areaSize" class="edit-area" @click.self="unselectWidget">
        <component v-for="widget in widgets"
            :is="`${widget.type}-widget`"
            :widget-props="widget.props"
            mode="edit"
            @selected="selectWidget" />
    </div>
</div>
</template>

<script>
import TextWidget from './widgets/TextWidget.vue'
import TableWidget from './widgets/TableWidget.vue'
import FigureWidget from './widgets/FigureWidget.vue'

export default {
    name: 'DashboardEditArea',
    data(){
        return {
            cellSize: 20,
            width: 0,
            height: 0,
            _containerHeight: 0,
            containerId: `dash-ea-${+ new Date()}`,
            widgets: [],
            selectedWidget: null,
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
            props = props || {id: id}
            this.widgets.push({
                type: type,
                props: props,
            })
        },
        getWidgets(){
            return this.widgets
        },
        selectWidget(e){
            this.selectedWidget = e
        },
        unselectWidget(){
            if(this.selectedWidget){
                this.selectedWidget.unselect()
            }
            this.selectedWidget = null
        },
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
}
</style>