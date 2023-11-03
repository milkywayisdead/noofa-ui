<template>
<v-menu v-model="visible">
    <v-list :id="id"
        style="postition:absolute"
        :style="posStyle"
        class="cursor-default"
        density="compact">
        <v-list-item
            v-for="(item, index) in items"
            :key="index">
                <v-list-item-title class="text-caption"
                    @click="item.onclick">
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item>
    </v-list>
</v-menu>
</template>

<script>
export default {
    name: 'CtxMenu',
    data(){
        return {
            items: [],
            visible: false,
            id: `ctxmenu${+ new Date()}`,
            _x: 0,
            _y: 0,
        }
    },
    methods: {
        update(items){
            this.items = items
            this.show()
        },
        show(){
            this.visible = true
        },
        hide(){
            this.visible = false
        },
        position(x, y){
            this._x = x
            this._y = y
        },
    },
    computed: {
        posStyle(){
            return `top:${this._y}px;left:${this._x}px`
        },
    },
}
</script>