<template>
    <v-text-field 
        :label="label"
        v-model="modelValue"
        density="compact"
        :hide-details="true"
        @change="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
export default {
    name: 'NooTextField',
    data(){
        return {
            modelValue: '',
        }
    },
    props: {
        label: {
            type: String,
        },
    }
}
</script>