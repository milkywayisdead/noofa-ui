<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props"
                class="cursor-default">
                {{ label }}
            </v-btn>
        </template>
        <v-list class="cursor-default">
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