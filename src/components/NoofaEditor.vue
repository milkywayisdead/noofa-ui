<template>
    <wrapper :key="w">
        <template v-slot:content>
            <editor ref="editor"
                @reload-requested="reload" />
        </template>
    </wrapper>
</template>

<script>
import Wrapper from './Wrapper.vue'
import Editor from './Editor.vue'

export default {
    name: 'NoofaEditor',
    data(){
        return {
            w: '0',
        }
    },
    methods: {
        reload(e){
            this.w = e
        },
    },
    components: {
        Wrapper,
        Editor,
    },
}
</script>