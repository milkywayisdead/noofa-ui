<template>
<div class="noo-widget-resizers"
    :style="sizeStyle + positionStyle">
</div>
<div class="widget-resizer-circle t"
    :style="tPosition"
    @mousedown="startResizing($event, 'up')"></div>
<div class="widget-resizer-circle r"
    :style="rPosition"
    @mousedown="startResizing($event, 'right')"></div>
<div class="widget-resizer-circle l"
    :style="lPosition"
    @mousedown="startResizing($event, 'left')"></div>
<div class="widget-resizer-circle b"
    :style="bPosition"
    @mousedown="startResizing($event, 'down')"></div>
</template>

<script>
export default {
    name: 'WidgetResizers',
    data(){
        return {
            height: 0,
            width: 0,
            top: 0,
            left: 0,
            
            initX: 0,
            initY: 0,
            direction: null,
            resizeMethods: {
                left: this._resizeLeft,
                right: this._resizeRight,
                up: this._resizeUp,
                down: this._resizeDown,
            },
        }
    },
    props: {
        widget: {
            type: Object,
        },
    },
    computed: {
        sizeStyle(){
            return `width:${this.width}px;height:${this.height}px;`
        },
        positionStyle(){
            return `top:${this.top}px;left:${this.left}px;`
        },
        tPosition(){
            return `top:${this.top - 4}px;left:${this.left + this.width/2 - 2}px;`
        },
        rPosition(){
            return `top:${this.top + this.height/2}px;left:${this.left + this.width}px;`
        },
        lPosition(){
            return `top:${this.top + this.height/2}px;left:${this.left - 4}px;`
        },
        bPosition(){
            return `top:${this.top + this.height -2}px;left:${this.left + this.width/2 - 2}px;`
        },
    },
    methods: {
        draw(){
            const w = this.widget.getWidgetElement()
            const r = w.getBoundingClientRect()
            this.top = w.offsetTop - 2
            this.left = w.offsetLeft - 2
            this.width = r.width + 4
            this.height = r.height + 4
        },
        startResizing(e, direction){
            e = e || window.event;

            document.onmousemove = this._resize
            document.onmouseup = this._stopResizing

            this.direction = direction
            this.initX = e.clientX
            this.initY = e.clientY
        },
        _resize(e){
            const rm = this.resizeMethods[this.direction]
            rm(e)
        },
        _stopResizing(e){
            document.onmousemove = null
            document.onmouseup = null
            this.direction = null
        },
        _resizeRight(e){
            const dx = e.clientX - this.initX
            const canBeResized = this.widget.checkSizeDeltas(dx, 0)
            if(canBeResized){
                this.widget.resizeWithDeltas(dx, 0)
                this.initX = e.clientX
            }
        },
        _resizeLeft(e){
            const dx = this.initX - e.clientX
            const canBeRepositioned = this.widget.checkPositionDeltas(dx, 0)
            const canBeResized = this.widget.checkSizeDeltas(dx, 0)
            if(canBeResized && canBeRepositioned){
                this.widget.positionWithDeltas(-dx, 0)
                this.widget.resizeWithDeltas(dx, 0)
                this.initX = e.clientX
            }
        },
        _resizeUp(e){
            const dy = this.initY - e.clientY
            const canBeRepositioned = this.widget.checkPositionDeltas(0, dy)
            const canBeResized = this.widget.checkSizeDeltas(0, dy)
            if(canBeResized && canBeRepositioned){
                this.widget.positionWithDeltas(0, -dy)
                this.widget.resizeWithDeltas(0, dy)
                this.initY = e.clientY
            }
        },
        _resizeDown(e){
            const dy = e.clientY - this.initY
            const canBeResized = this.widget.checkSizeDeltas(0, dy)
            if(canBeResized){
                this.widget.resizeWithDeltas(0, dy)
                this.initY = e.clientY
            }
        },
    },
}
</script>