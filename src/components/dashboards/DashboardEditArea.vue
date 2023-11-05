<template>
<div style="outline: 1px solid black;padding:4px;height:inherit;overflow-x:scroll;overflow-y:scroll">
    <div :style="bgSize + areaSize" class="edit-area">

    </div>
</div>
</template>

<script>
export default {
    name: 'DashboardEditArea',
    data(){
        return {
            cellSize: 20,
            width: 0,
            height: 0,
        }
    },
    computed: {
        bgSize(){
            return `background-size: ${this.cellSize}px ${this.cellSize}px;`
        },
        bgImage(){
            return  `background-image:${[
                'linear-gradient(to right, grey 1px, transparent 1px)',
                'linear-gradient(to bottom, grey 1px, transparent 1px);'
            ].join(',')}`
        },
        areaSize(){
            return `height:${this.height}px;width:${this.width}px;`
        },
    },
    methods: {
        setSize(w, h){
            this.width = w
            this.height = h
        },
    },
}
</script>

<style scoped>
.edit-area {
    background: #a8a5a51f;
    background-image:
        linear-gradient(to right, grey 1px, transparent 1px),
        linear-gradient(to bottom, grey 1px, transparent 1px);
    position: relative;
}
</style>