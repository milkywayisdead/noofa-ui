<template>
    <wrapper>
        <template v-slot:content>
            <editor></editor>
        </template>
    </wrapper>
</template>

<script>
import Wrapper from './Wrapper.vue'
import Editor from './Editor.vue'

export default {
    name: 'NoofaEditor',
    data(){
        return {}
    },
    components: {
        Wrapper,
        Editor,
    },
}
</script>