const dashboardWidgetMixin = {
    data(){
        const props = this.widgetProps

        return {
            id: props.id,
            top: props.layout.top,
            left: props.layout.left,
            width: props.layout.width,
            height: props.layout.height,

            scaling: props.scaling || {},
        }
    },
    inject: ['api'],
    props: {
        widgetProps: {
            type: Object,
        },
        dashboard: {
            type: Object,
        },
    },
    computed: {
        positionStyle(){
            let top = this.top
            let left = this.left

            if(this.dashboard.scaling){
                return `top:${this.scaling.scaledTop}%;left:${this.scaling.scaledLeft}%;`
            }

            return `top:${top}px;left:${left}px;`
        },
        sizeStyle(){
            let width = this.width
            let height = this.height

            if(this.dashboard.scaling){
                return `width:${this.scaling.scaledWidth}%;height:${this.scaling.scaledHeight}%;`
            }

            return `width:${width}px;height:${height}px;`
        },
    },
    methods: {
        getWidgetData(){
            this.api.getWidgetData(this.dashboard.id, this.id)
                .then(res => {
                    this.updateContent(res.data)
                }).catch(err => {})
        },
        updateContent(data){},
        redraw(){},
    },
    mounted(){
        this.dashboard.addWidgetObject(this)
    },
}

export default dashboardWidgetMixin