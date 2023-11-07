const dashboardWidgetMixin = {
    data(){
        const props = this.widgetProps

        return {
            id: props.id,
            top: 
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
    methods: {
        getWidgetData(){
            this.api.getWidgetData(this.dashboard.id, this.id)
                .then(res => {
                    this.updateContent(res.data)
                }).catch(err => {})
        },
        updateContent(){},
    },
}

export default dashboardWidgetMixin