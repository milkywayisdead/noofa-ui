<template>
<v-dialog v-model="visible"
    scrollable
    persistent
    width="30%">
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            {{ message }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn @click="close">{{ locale.actions.ok }}</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'SimpleMessageDialog',
    inject: ['locale'],
    data(){
        return {
            visible: false,
            title: '',
            message: '',
        }
    },
    emits: ['ok'],
    methods: {
        open(){
            this.visible = true
        },
        close(){
            this.$emit('ok')
            this.visible = false
        },
        openWithParams(params){
            this.title = params.title ?? ''
            this.message = params.message ?? ''
            this.open()
        },
    },
}
</script>