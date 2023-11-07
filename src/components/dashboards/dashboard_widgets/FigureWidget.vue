<template>
<v-card :style="positionStyle + sizeStyle">
    <v-card-title class="prevent-select">{{ title }}</v-card-title>
    <v-card-text :id="cardContentId" style="height:100%;width:100%;padding:0px;">
        <div :id="containerId" :style="containerSize"></div>
    </v-card-text>
</v-card>
</template>

<script>
import dashboardWidgetMixin from '@/utils/mixins/dashwidgets.js'
import { plotlyUtils } from '@/utils/fig.js'

export default {
    name: 'FigureWidget',
    mixins: [dashboardWidgetMixin, ],
    data(){
        const props = this.widgetProps

        return {
            title: props.props.title,

            cardContentId: `${props.id}-card`,
            containerId: `${props.id}-container`,
            containerWidth: 0,
            containerHeight: 0,

            _figureData: null,
        }
    },
    computed: {
        containerSize(){
            return `width:${this.containerWidth}px;height:${this.containerHeight}px;`
        },
    },
    mounted(){
        this.getWidgetData()
    },
    methods: {
        updateContent(data){
            this.resizeContainer()

            this.$nextTick(_ => {
                plotlyUtils.create(
                    this.containerId,
                    data.data,
                )

                this._figureData = data.data
            })
        },
        resizeContainer(){
            const r = document.getElementById(this.cardContentId)
                                .getBoundingClientRect()
            this.containerWidth = r.width
            this.containerHeight = r.height
        },
    },
}
</script>