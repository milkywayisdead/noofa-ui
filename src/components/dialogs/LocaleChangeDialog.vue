<template>
<v-dialog v-model="visible"
    scrollable
    persistent
    width="30%">
    <v-card>
        <v-card-title>{{ locale.localeChange }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            {{ locale.messages.localeChangeAlert }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn @click="close">{{ locale.actions.gotIt }}</v-btn>
            <v-btn @click="reload">{{ locale.actions.reload }}</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'LocaleChangeDialog',
    inject: ['locale'],
    data(){
        return {
            visible: false,
        }
    },
    emits: ['reload-confirmed'],
    methods: {
        open(){
            this.visible = true
        },
        close(){
            this.visible = false
        },
        reload(){
            this.$emit('reload-confirmed')
            this.close()
        },
    },
}
</script>