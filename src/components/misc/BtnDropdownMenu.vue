<template>
<v-menu class="pointer">
    <template v-slot:activator="{ props: menu }">
    <v-tooltip location="bottom">
        <template v-slot:activator="{ props: tooltip }">
        <v-btn
            icon
            v-bind="mergeProps(menu, tooltip)"
        >
            <v-icon>{{ icon }}</v-icon>
        </v-btn>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
    </template>
    <v-list>
    <v-list-item
        v-for="(item, index) in items"
        :key="index"
    >
        <v-list-item-title @click="emitSelected(item.value)">
            {{ item.title }}
        </v-list-item-title>
    </v-list-item>
    </v-list>
</v-menu>
</template>

<script>
import { mergeProps } from 'vue'

export default {
    name: 'BtnDropdownMenu',
    data(){
        return {
            enabled: true,
        }
    },
    props: {
        icon: String,
        items: Array,
        tooltip: String,
    },
    emits: ['item-selected'],
    methods: {
        emitSelected(item){
            this.$emit('item-selected', item)
        },
        mergeProps,
    },
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
}
</style>