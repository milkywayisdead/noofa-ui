<template>
<div :id="`${id}-dash`" 
    :style="sizeStyle + bgStyle">
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

            widgets: [],
            widgetsObjects: {},
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

                if(!this.scaling){
                    this.widgets = Object.values(res.data.widgets)
                } else {
                    this.widgets = Object.values(res.data.widgets).map(w => {
                        const { width, height, top, left} = w.layout

                        return {
                            ...w,
                            scaling: {
                                scaledTop: (top/this.height)*100,
                                scaledLeft: (left/this.width)*100,
                                scaledWidth: (width/this.width)*100,
                                scaledHeight: (height/this.height)*100,
                            },
                        }
                    })
                }

                addEventListener('resize', this.scale)
                this.scale()
            }).catch(err => {
                this.snackbar.error(
                    this.locale.messages.errorWhenLoadingDashboard
                )
                document.title(this.locale.messages.errorWhenLoadingDashboard)
            })
    },
    unmounted(){
        removeEventListener('resize', this.scale)
    },
    methods: {
        addWidgetObject(wo){
            this.widgetsObjects[wo.id] = wo
        },
        scale(){
            if(!this.scaling) return

            this.width = window.innerWidth
            this.height = window.innerHeight

            for(let w of Object.values(this.widgetsObjects)){
                w.redraw()
            }
        },
    },
    computed: {
        sizeStyle(){
            return `height:${this.height}px;width:${this.width}px;`
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