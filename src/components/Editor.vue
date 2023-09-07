<template>
    <wrapper>
        <template v-slot:content>
            <v-toolbar>
                <open-profile-dialog />
                <v-btn 
                    icon="mdi-content-save"
                    @click="saveProfile" />
                <new-source-dialog />
                <v-btn icon="mdi-swap-horizontal" />
                <v-btn icon="mdi-table-large-plus" />
            </v-toolbar>
        </template>
    </wrapper>
</template>

<script>
import api from '../utils/api/api.js'
import Wrapper from './Wrapper.vue'
import NewSourceDialog from './dialogs/NewSourceDialog.vue'
import OpenProfileDialog from './dialogs/OpenProfileDialog.vue'
import NoofaCtx from '../utils/context/context.js'

export default {
    name: 'Editor',
    data(){
        return {
            context: new NoofaCtx({}),
            api: api,
        }
    },
    provide(){
        return {
            context: this.context,
            api: this.api
        }
    },
    methods: {
        saveProfile(){
            const method = this.context.hasId() ? this.api.updateProfile : this.api.createProfile
            method(this.context.compile())
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data)
                    }
                })
        },
    },
    components: {
        Wrapper,
        NewSourceDialog,
        OpenProfileDialog,
    },
}
</script>