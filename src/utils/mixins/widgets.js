import WidgetResizers from '@/components/dashboards/widgets/WidgetResizers.vue'

const widgetMixin = {
    data(){
        return {
            id: this.widgetProps.id,
            type: '',
            top: 0,
            left: 0,
            selected: false,
        }
    },
    props: {
        widgetProps: {
            type: Object,
        },
        mode: {
            type: String,
            default: 'edit',
        }
    },
    computed: {
        positionStyle(){
            return `top:${this.top}px;left:${this.left}px;`
        },
        editorMode(){
            return this.mode === 'edit'
        },
    },
    emits: ['selected',],
    methods: {
        position(x, y){
            this.left = x
            this.top = y
        },
        getWidgetElement(){
            return document.getElementById(this.id)
        },
        select(){
            this.selected = true
            this.$emit('selected', this)
        },
        unselect(){
            this.selected = false
        },
    },
    watch: {
        selected(v){
            if(v && this.editorMode){
                this.$nextTick(_ => {
                    this.$refs.resizers.draw()
                })
            }
        },
    },
    components: {
        WidgetResizers,
    },
}

export default widgetMixin