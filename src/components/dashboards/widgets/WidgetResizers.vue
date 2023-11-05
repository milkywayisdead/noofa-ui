<template>
<div class="noo-widget-resizers"
    :style="sizeStyle + positionStyle">
</div>
<div class="widget-resizer-circle lu"
    :style="luPosition"></div>
<div class="widget-resizer-circle ru"
    :style="ruPosition"></div>
<div class="widget-resizer-circle rd"
    :style="rdPosition"></div>
<div class="widget-resizer-circle ld"
    :style="ldPosition"></div>
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
        luPosition(){
            return `top:${this.top -2 }px;left:${this.left - 2}px;`
        },
        ruPosition(){
            return `top:${this.top - 2}px;left:${this.left + this.width - 2}px;`
        },
        rdPosition(){
            return `top:${this.top + this.height - 2}px;left:${this.left + this.width - 2}px;`
        },
        ldPosition(){
            return `top:${this.top + this.height - 2}px;left:${this.left - 2}px;`
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