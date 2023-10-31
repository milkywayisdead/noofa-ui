<template>
<v-tooltip location="bottom"
    open-delay="500">
    <template v-slot:activator="{ props }">
        <v-btn
            icon
            v-bind="props"
            :disabled="!enabled"
            @click="emitClick">
            <v-icon>
                {{ icon }}
            </v-icon>
        </v-btn>
    </template>
    <span v-if="tooltip">{{ tooltip }}</span>
</v-tooltip>
</template>

<script>
export default {
    name: 'IconButton',
    data(){
        return {
            enabled: true,
        }
    },
    props: {
        icon: {
            type: String,
        },
        tooltip: {
            type: String,
            default: '',
        },
    },
    emits: ['click'],
    methods: {
        emitClick(){
            this.$emit('click')
        },
        setEnabledProp(value){
            this.enabled = value
        },
    },
}
</script>