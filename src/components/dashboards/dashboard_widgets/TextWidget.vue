<template>
<textarea readonly :style="positionStyle + sizeStyle + fontStyle"
    class="noo-dashboard-widget noo-dashboard-text prevent-select"
    disabled>
    {{ text }}
</textarea>
</template>

<script>
import dashboardWidgetMixin from '@/utils/mixins/dashwidgets.js'

export default {
    name: 'TextWidget',
    mixins: [dashboardWidgetMixin, ],
    data(){
        const props = this.widgetProps

        return {
            text: '',
            fontSize: props.props.fontSize,
            fontColor: props.props.fontColor,
        }
    },
    computed: {
        fontStyle(){
            return `font-size:${this.fontSize}px;color:${this.fontColor};`
        },
    },
    mounted(){
        this.getWidgetData()
    },
    methods: {
        updateContent(data){
            this.text = data
        },
    },
}
</script>