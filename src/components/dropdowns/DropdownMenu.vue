<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props">{{ label }}</v-btn>
        </template>
        <v-list class="c">
            <slot name="items"></slot>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'DropdownMenu',
    data(){
        return {}
    },
    props: {
        label: {
            type: String,
        },
    },
}
</script>

<style scoped>
.c {
    cursor: pointer;
}
</style>