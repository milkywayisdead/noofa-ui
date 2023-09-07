<template>
    <v-select
        :label="label"
        v-model="modelValue"
        :items="items"
        item-title="text"
        item-value="value"
        density="compact"
        :hide-details="true"
        @change="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
export default {
    name: 'NooSelect',
    data(){
        return {
            modelValue: '',
        }
    },
    props: {
        label: {
            type: String,
        },
        items: {
            type: Array,
            default: [],
        },
    }
}
</script>