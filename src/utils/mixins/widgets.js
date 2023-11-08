import WidgetResizers from '@/components/dashboards/editor/WidgetResizers.vue'
import ctxMenuMixin from './ctxmenu.js'
import NooSelect from '@/components/inputs/NooSelect.vue'
import NooTextField from '@/components/inputs/NooTextField.vue'

const widgetMixin = {
    data(){
        const props = this.widgetProps

        return {
            id: props.id,
            type: '',
            top: props.layout.top || 0,
            left: props.layout.left || 0,
            height: props.layout.height || 100,
            width: props.layout.width || 100,
            selected: false,

            useCustomCtxmenuItems: true,
            customCtxmenuItems: [
                {
                    title: this.locale.actions.delete,
                    icon: 'mdi-delete',
                    onclick: this.emitDelete,
                }
            ],

            changeableProps: [],
        }
    },
    mounted(){
        this.editArea.addWidgetObject(this)
    },
    inject: ['editArea', 'dashboard', 'api', 'locale', 'snackbar'],
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
        layoutProps(){
            return {
                top: this.top,
                left: this.left,
                width: this.width,
                height: this.height,
            }
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
        getWidgetProps(){
            const props = {}
            for(let p of this.changeableProps){
                props[p] = this[p]
            }
            return props
        },
        updateProperty({name, value}){
            this[name] = value
        },
        getWidgetData(){
            const uuid = this.dashboard.getUUID()
            if(!uuid) return

            this.api.getWidgetData(uuid, this.id)
                .then(res => {
                    this.updateContent(res.data)
                }).catch(err => {
                    this.snackbar.error(
                        this.locale.messages.errorWhenGettingWidgetData
                    )

                    console.log(err)
                })
        },
        updateContent(data){},
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


const widgetSettingsMixin = {
    data(){
        return {
            changeableProps: [],
        }
    },
    props: {
        widget: {
            type: Object,
        },
        panelTitle: {
            type: String,
        },
    },
    inject: ['locale', 'context'],
    emits: ['property-changed',],
    methods: {
        emitChanged(prop, value){
            this.$emit('property-changed', {
                name: prop,
                value: value,
            })
        },
    },
    components: {
        NooSelect,
        NooTextField,
    }
}


export {
    widgetMixin,
    draggableWidgetMixin,
    widgetSettingsMixin,
}