<template>
    <wrapper>
        <template v-slot:content>
            <v-toolbar>
                <open-profile-dialog />
                <v-btn icon="mdi-content-save"></v-btn>
                <new-source-dialog />
                <v-btn icon="mdi-swap-horizontal"></v-btn>
                <v-btn icon="mdi-table-large-plus"></v-btn>
            </v-toolbar>
        </template>
    </wrapper>
</template>

<script>
import Wrapper from './Wrapper.vue'
import NewSourceDialog from './dialogs/NewSourceDialog.vue'
import OpenProfileDialog from './dialogs/OpenProfileDialog.vue'
import NoofaCtx from '../utils/context/context.js'

export default {
    name: 'Editor',
    data(){
        return {
            context: new NoofaCtx({}),
        }
    },
    provide(){
        return {
            context: this.context,
        }
    },
    components: {
        Wrapper,
        NewSourceDialog,
        OpenProfileDialog,
    },
}
</script>