<template>
<textarea :id="`${id}-dash-text`"
    :style="positionStyle + sizeStyle + fontStyle"
    class="noo-dashboard-widget noo-dashboard-text prevent-select"
    readonly 
    disabled
    :value="text" 
    @onselectstart.prevent />
</template>

<script>
import dashboardWidgetMixin from '@/utils/mixins/dashwidgets.js'

export default {
    name: 'TextWidget',
    mixins: [dashboardWidgetMixin,],
    data(){
        const props = this.widgetProps

        return {
            text: '',
            fontSize: props.scaling.fontK || props.props.fontSize,
            fontColor: props.props.fontColor,
            fontK: props.scaling.fontK,
        }
    },
    computed: {
        fontStyle(){
            return `font-size:${this.fontSize}px;color:${this.fontColor};`
        },
    },
    mounted(){
        this.redraw()
        this.getWidgetData()
    },
    methods: {
        updateContent(data){
            this.text = data
        },
        redraw(){
            if(!this.dashboard.scaling) return

            this.fontSize = (this.dashboard.height*this.fontK)/100
        },
    },
}
</script>