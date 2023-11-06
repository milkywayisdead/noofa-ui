<template>
<div class="noo-widget-resizers"
    :style="sizeStyle + positionStyle">
</div>
<div class="widget-resizer-circle t"
    :style="tPosition"></div>
<div class="widget-resizer-circle r"
    :style="rPosition"></div>
<div class="widget-resizer-circle l"
    :style="lPosition"></div>
<div class="widget-resizer-circle b"
    :style="bPosition"></div>
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
    },
}
</script>