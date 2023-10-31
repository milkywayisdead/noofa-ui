<template>
    <v-card elevation="12" :id="divId" style="overflow: scroll">
        <v-tabs v-model="tab">
            <v-tab v-for="item in tabs" 
                :key="_key(item)"
                :value="_key(item)"
            >{{ item.props.name }}
                <v-icon icon="mdi-close" 
                    @click.stop="closeTab(_key(item))" />
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="item in tabs" 
                :key="_key(item)"
                :value="_key(item)"
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
import TableTab from './TableTab.vue'
import FigureTab from './FigureTab.vue'
import ValueTab from './ValueTab.vue'
import DocumentTab from './DocumentTab.vue'
import DashboardTab from './DashboardTab.vue'

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
            const tabId = props.type !== 'dashboard' ? props.props.id : props.props.contextualId
            const tabIdProp = props.type !== 'dashboard' ? 'id' : 'contextualId'

            for(let tab of this.tabs){
                if(tab.props[tabIdProp] === tabId){
                    this.tab = tabId
                    return
                }
            }

            this.tabs.push(props)
            this.tab = tabId
        },
        closeTab(tabId){
            const tabIdProp = tabId.startsWith('dash') ? 'contextualId' : 'id'

            this.tabs = this.tabs.filter(tab => tab.props[tabIdProp] !== tabId)
            if(this.tabs.length){
                this.tab = this.tabs[0].props[tabIdProp]
            }
        },
        clear(){
            this.tabs = []
            this.tab = null
        },
        _key(item){
            return item.type === 'dashboard' ? item.props.contextualId : item.props.id
        },
    },
    components: {
        SourceTab,
        QueryTab,
        DataframeTab,
        TableTab,
        FigureTab,
        ValueTab,
        DocumentTab,
        DashboardTab,
    },
}
</script>

<style scoped>
.no-transition {
    transition: none!important;
}
</style>