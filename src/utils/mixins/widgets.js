import WidgetResizers from '@/components/dashboards/widgets/WidgetResizers.vue'
import ctxMenuMixin from './ctxmenu.js'

const widgetMixin = {
    data(){
        return {
            id: this.widgetProps.id,
            type: '',
            top: 0,
            left: 0,
            height: 100,
            width: 100,
            selected: false,

            useCustomCtxmenuItems: true,
            customCtxmenuItems: [
                {
                    title: this.locale.actions.delete,
                    icon: 'mdi-delete',
                    onclick: this.emitDelete,
                }
            ],
        }
    },
    mixins: [ctxMenuMixin,],
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
        sizeStyle(){
            return `width:${this.width}px;height:${this.height}px;`
        },
    },
    emits: ['selected', 'delete', ],
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
        beforeOnClick(){
            this.select()
        },
        emitDelete(){
            this.$emit('delete', this.id)
        },
        resizeWithDeltas(dx=0, dy=0){
            this.width += dx
            this.height += dy
        },
        positionWithDeltas(dx=0, dy=0){
            this.left += dx
            this.top += dy
        },
        checkPositionDeltas(dx=0, dy=0){
            return true
        },
        checkSizeDeltas(dx=0, dy=0){
            return true
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
        positionStyle(){
            if(!this.editorMode) return

            try {
                this.$refs.resizers.draw()
            } catch {}
        },
        sizeStyle(){
            if(!this.editorMode) return

            try {
                this.$refs.resizers.draw()
            } catch {}
        },
    },
    components: {
        WidgetResizers,
    },
}


const draggableWidgetMixin = {
    data(){
        return {
            _x0: 0,
            _y0: 0,
            _x1: 0,
            _y1: 0,
        }
    },
    methods: {
        startDragging(e){
            if(!this.editorMode) return

            e = e || window.event
            e.preventDefault()

            this._x1 = e.clientX
            this._y1 = e.clientY
            document.onmouseup = this._stopDragging
            document.onmousemove = this._dragWidget
        },
        _dragWidget(e){
            e = e || window.event;
            e.preventDefault();

            this._x0 = this._x1 - e.clientX
            this._y0 = this._y1 - e.clientY
            this._x1 = e.clientX
            this._y1 = e.clientY

            const widget = this.getWidgetElement()
            this.position(
                widget.offsetLeft - this._x0,
                widget.offsetTop - this._y0,
            )
        },
        _stopDragging(){
            document.onmouseup = null
            document.onmousemove = null

            try {
                this.$refs.resizers.draw()
            } catch {}
        }
    },
}


export {
    widgetMixin,
    draggableWidgetMixin,
}