<template>
    <v-card elevation="12">
        <v-tabs v-model="tab">
            <v-tab v-for="item in tabs" 
                :key="item.props.id"
                :value="item.props.id"
            >{{ item.props.name }}
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="item in tabs" 
                :key="item.props.id"
                :value="item.props.id"
            >
                <component :is="`${item.type}-tab`" />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import SourceTab from './SourceTab.vue'

export default {
    name: 'TabsArea',
    data(){
        return {
            tab: null,
            tabs: [],
        }
    },
    methods: {
        addTab(props){
            const tabId = props.props.id
            for(let tab of this.tabs){
                if(tab.props.id === tabId){
                    this.tab = tabId
                    return
                }
            }

            this.tabs.push(props)
            this.tab = tabId
        },
    },
    components: {
        SourceTab,
    },
}
</script>