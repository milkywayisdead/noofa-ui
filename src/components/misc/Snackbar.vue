<template>
<v-snackbar v-model="visible"
    location="bottom right"
    :color="color"
    open-delay="200"
    :timeout="timeout"
    milti-line>
    {{ message }}
    <template v-slot:actions>
        <v-btn icon="mdi-close"
          variant="text"
          @click="close" />
      </template>
</v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    data(){
        return {
            visible: false,
            message: '',
            color: 'secondary',
            timeout: 2000,
        }
    },
    methods: {
        showMessage(message, color='secondary'){
            this.message = message
            this.color = color
            this.show()
        },
        show(){
            this.visible = true
        },
        close(){
            this.visible = false
        }, 
    },
    watch: {
        visible(v){
            if(!v){
                this.message = ''
                this.color = 'secondary'
            }
        },
    },
}
</script>