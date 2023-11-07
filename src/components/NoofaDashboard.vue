<template>
<wrapper>
    <template v-slot:content>
        <dashboard />
    </template>
</wrapper>
</template>

<script>
import Wrapper from './Wrapper.vue'
import Dashboard from '@/components/dashboards/Dashboard.vue'

export default {
    name: 'NoofaDashboard',
    data(){
        return {}
    },
    components: {
        Wrapper,
        Dashboard,
    },
}
</script>