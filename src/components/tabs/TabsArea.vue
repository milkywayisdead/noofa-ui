<template>
    <v-card elevation="12" :id="divId">
        <v-tabs v-model="tab">
            <v-tab v-for="item in tabs" 
                :key="item.props.id"
                :value="item.props.id"
            >{{ item.props.name }}
                <v-icon icon="mdi-close" 
                    @click.stop="closeTab(item.props.id)" />
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="item in tabs" 
                :key="item.props.id"
                :value="item.props.id"
                class="px-2 pb-2 pt-2 no-transition"
            >
                <component 
                    :is="`${item.type}-tab`" 
                    :item-props="item.props" 
                    @item-delete="closeTab($event)" 
                    @enter-loading-state="loading = true" 
                    @exit-loading-state="loading = false" />
            </v-window-item>
        </v-window>
    </v-card>
    <v-overlay
      v-model="loading"
      class="align-center justify-center"
      contained
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>

<script>
import SourceTab from './SourceTab.vue'
import QueryTab from './QueryTab.vue'
import DataframeTab from './DataframeTab.vue'


const tabsAreaId = `tabs-area-${+new Date()}`
const changeTabsAreaHeight = () => {
    const tabsArea = document.getElementById(tabsAreaId)
    const rect = tabsArea.getBoundingClientRect()
    const height = window.innerHeight - rect.y - 15
    tabsArea.style.height = height + 'px'
}

export default {
    name: 'TabsArea',
    data(){
        return {
            tab: null,
            tabs: [],
            loading: false,
            divId: tabsAreaId,
        }
    },
    mounted(){
        changeTabsAreaHeight()
        addEventListener('resize', changeTabsAreaHeight)
    },
    unmounted(){
        removeEventListener('resize', changeTabsAreaHeight)
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
        closeTab(tabId){
            this.tabs = this.tabs.filter(tab => tab.props.id !== tabId)
            if(this.tabs.length){
                this.tab = this.tabs[0].props.id
            }
        },
        clear(){
            this.tabs = []
            this.tab = null
        },
    },
    components: {
        SourceTab,
        QueryTab,
        DataframeTab,
    },
}
</script>

<style scoped>
.no-transition {
    transition: none!important;
}
</style>