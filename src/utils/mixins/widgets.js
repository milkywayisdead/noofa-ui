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
    inject: ['editArea',],
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
            const testX = this.left + dx
            const testY = this.top + dy

            if(testX < 0 || testY < 0) return false

            const rect = this.getWidgetElement().getBoundingClientRect()
            const ea = this.editArea.getShape()
            if((testX + rect.width > ea.width) ||
                (testY + rect.height > ea.height)
            ) return false

            return true
        },
        checkSizeDeltas(dw=0, dh=0){
            const testW = this.width + dw
            const testH = this.height + dh

            const ea = this.editArea.getShape()
            if(this.top + testH > ea.height) return false
            if(this.left + testW > ea.width) return false

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

            this.$nextTick(_ => {
                try {
                    this.$refs.resizers.draw()
                } catch {}
            })
        },
        sizeStyle(){
            if(!this.editorMode) return

            this.$nextTick(_ => {
                try {
                    this.$refs.resizers.draw()
                } catch {}
            })
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

            const dx = e.clientX - this._x1
            const dy = e.clientY - this._y1
            const canBeRepositioned = this.checkPositionDeltas(dx, dy)
            if(!canBeRepositioned) return

            this._x0 = this._x1 - e.clientX
            this._y0 = this._y1 - e.clientY
            this._x1 = e.clientX
            this._y1 = e.clientY

            this.positionWithDeltas(dx, dy)
        },
        _stopDragging(){
            document.onmouseup = null
            document.onmousemove = null

            if(this.editArea.bindToGrid){
                this.bindToGrid()
            }

            try {
                this.$refs.resizers.draw()
            } catch {}
        },
        bindToGrid(){
            const { x, y } = this.editArea.getClosestIntersect(
                this.left,
                this.top
            )
            this.position(x, y)
        },
    },
}


export {
    widgetMixin,
    draggableWidgetMixin,
}