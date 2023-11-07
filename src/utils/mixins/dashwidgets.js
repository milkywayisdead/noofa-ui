const dashboardWidgetMixin = {
    data(){
        const props = this.widgetProps

        return {
            id: props.id,
            top: props.layout.top,
            left: props.layout.left,
            width: props.layout.width,
            height: props.layout.height,
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
            const top = this.top
            const left = this.left
            return `top:${top}px;left:${left}px;`
        },
        sizeStyle(){
            const width = this.width
            const height = this.height
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
    },
}

export default dashboardWidgetMixin