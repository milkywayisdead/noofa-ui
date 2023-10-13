<template>
    <v-dialog
        v-model="visible"
        scrollable
        persistent
        :width="width"
    >
        <template v-slot:activator="{ props }">
            <v-btn v-if="activatorIcon"
                v-bind="props"
                :icon="activatorIcon"
                :disabled="activatorDisabled">
            </v-btn>
        </template>
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="visible = false">{{ locale.actions.cancel }}</v-btn>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'BaseDialog',
    data(){
        return {
            visible: false,
            activatorDisabled: false,
        }
    },
    inject: ['locale'],
    props: {
        activatorIcon: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '33%',
        },
        onOpen: {
            type: [Function, null],
            default: null,
        },
    },
    methods: {
        open(){
            this.visible = true
        },
        close(){
            this.visible = false
        },
    },
    emits: ['close'],
    watch: {
        visible(value){
            if(value){
                if(this.onOpen){
                    this.onOpen()
                }
            } else {
                this.$emit('close')
            }
        },
    },
}
</script>