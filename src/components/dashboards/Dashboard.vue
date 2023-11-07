<template>
<div :style="sizeStyle + bgStyle" style="position:absolute">
    <component v-for="(widget, widgetId) in widgets"
        :key="widgetId"
        :is="`${widget.type}-widget`"
        :widget-props="widget"
        :dashboard="this"
    />
</div>
</template>

<script>
import TextWidget from './dashboard_widgets/TextWidget.vue'
import TableWidget from './dashboard_widgets/TableWidget.vue'
import FigureWidget from './dashboard_widgets/FigureWidget.vue'

export default {
    name: 'Dashboard',
    data(){
        document.title = ''

        return {
            id: this.$route.params.dashId,

            scaling: false,
            width: 0,
            height: 0,
            bgColor: '#ddd',

            widgets: {},
        }
    },
    inject: ['api', 'locale', 'snackbar'],
    mounted(){
        this.api.getDashboard(this.id)
            .then(res => {
                const { scaling, width, height } = res.data.properties
                this.scaling = scaling
                this.width = width
                this.height = height

                document.title = res.data.name

                this.widgets = res.data.widgets
            }).catch(err => {
                this.snackbar.error(
                    this.locale.messages.errorWhenLoadingDashboard
                )
                document.title(this.locale.messages.errorWhenLoadingDashboard)
            })
    },
    computed: {
        sizeStyle(){
            return this.scaling ? 
                'height:100%;width:100%;' :
                `height:${this.height}px;width:${this.width}px;`
        },
        bgStyle(){
            return `background-color:${this.bgColor};`
        },
    },
    components: {
        TextWidget,
        TableWidget,
        FigureWidget,
    },
}
</script>