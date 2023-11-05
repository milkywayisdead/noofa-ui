<template>
<div class="noo-widget-resizers"
    :style="sizeStyle + positionStyle">
</div>
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