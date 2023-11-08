<template>
<div :id="id"
    class="noo-widget"
    :style="positionStyle + sizeStyle"
    @click="select"
    @contextmenu.prevent="contextMenu"
    @mousedown="select(), startDragging($event)">
    <v-card class="noo-figure-widget-card">
        <v-card-title class="prevent-select">{{ title }}</v-card-title>
        <v-card-text :id="cardContentId" style="height:100%;width:100%;padding:0px;">
            <div :id="containerId" :style="containerSize"></div>
        </v-card-text>
    </v-card>
</div>
<widget-resizers v-if="editorMode && selected"
    ref="resizers"
    :widget="this" />
</template>

<script>
import { widgetMixin, draggableWidgetMixin } from '@/utils/mixins/widgets.js'
import { plotlyUtils } from '@/utils/fig.js'

export default {
    name: 'FigureWidget',
    mixins: [widgetMixin, draggableWidgetMixin],
    data(){
        const props = this.widgetProps

        return {
            type: 'figure',
            figureId: props.props.figureId || '',
            title: props.props.title || '',

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
        getWidgetProps(){
            return {
                id: this.id,
                type: this.type,
                props: {
                    title: this.title,
                    figureId: this.figureId,
                },
                layout: this.layoutProps,
            }
        },
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
    watch: {
        sizeStyle(){
            if(!this.editorMode) return

            this.$nextTick(_ => {
                try {
                    this.$refs.resizers.draw()
                } catch {}
            })

            if(!this._figureData) return
            this.resizeContainer()
            this.$nextTick(_ => {
                plotlyUtils.create(
                    this.containerId,
                    this._figureData,
                )
            })
        },
    },
}
</script>