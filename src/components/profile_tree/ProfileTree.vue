<template>
    <v-card 
        rounded 
        elevation="12" 
        :id="divId"
        @contextmenu.prevent >
        <v-toolbar color="grey-darken-2" density="compact">
            <v-toolbar-title class="prevent-select">{{ context.name }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text id="profile-tree">
            <profile-tree-branch 
                :subheader="locale.profiles.data"
                icon="mdi-database"
                @profile-item-selected="emitSelected"
                item-type="data"
                :ctxmenu-items="ctxmenus.data"
            >
                <template v-slot:items>
                    <profile-tree-branch 
                        :subheader="locale.sources.plural"
                        icon="mdi-database-export"
                        :items="context.sources"
                        item-type="source"
                        @profile-item-selected="emitSelected"
                        :ctxmenu-items="ctxmenus.sources"
                        @profile-item-delete="emitDelete"
                    />
                    <profile-tree-branch 
                        :subheader="locale.queries.plural"
                        icon="mdi-database-search"
                        :items="context.queries"
                        item-type="query"
                        @profile-item-selected="emitSelected"
                        :ctxmenu-items="ctxmenus.queries"
                        @profile-item-delete="emitDelete"
                    />
                    <profile-tree-branch 
                        :subheader="locale.dataframes.plural"
                        icon="mdi-table-large"
                        :items="context.dataframes"
                        item-type="dataframe"
                        @profile-item-selected="emitSelected"
                        :ctxmenu-items="ctxmenus.dataframes"
                        @profile-item-delete="emitDelete"
                    />
                </template>
            </profile-tree-branch>
            <profile-tree-branch 
                :subheader="locale.profiles.components"
                icon="mdi-chart-box"
                item-type="components"
                @profile-item-selected="emitSelected"
                :ctxmenu-items="ctxmenus.components"
            >
                <template v-slot:items>
                    <profile-tree-branch 
                        :subheader="locale.tables.plural"
                        icon="mdi-table"
                        :items="ctxTables"
                        item-type="table"
                        @profile-item-selected="emitSelected"
                        :ctxmenu-items="ctxmenus.tables"
                        @profile-item-delete="emitDelete"
                    />
                    <profile-tree-branch 
                        :subheader="locale.figures.plural"
                        icon="mdi-chart-line"
                        :items="ctxFigures"
                        item-type="figure"
                        @profile-item-selected="emitSelected"
                        :ctxmenu-items="ctxmenus.figures"
                        @profile-item-delete="emitDelete"
                    />
                </template>
            </profile-tree-branch>
            <profile-tree-branch 
                :subheader="locale.values.plural"
                icon="mdi-format-superscript"
                @profile-item-selected="emitSelected"
                item-type="value"
                :items="ctxValues"
                :ctxmenu-items="ctxmenus.values" 
                @profile-item-delete="emitDelete" />
            <profile-tree-branch 
                :subheader="locale.documents.plural"
                icon="mdi-file-pdf-box"
                @profile-item-selected="emitSelected"
                item-type="document"
                :items="ctxDocuments"
                :ctxmenu-items="ctxmenus.documents" 
                @profile-item-delete="emitDelete" />
            <profile-tree-branch 
                :subheader="locale.dashboards.plural"
                icon="mdi-view-dashboard"
                @profile-item-selected="emitSelected"
                item-type="dashboard"
                :items="ctxDashboards"
                :ctxmenu-items="ctxmenus.dashboards" 
                @profile-item-delete="emitDelete" />
        </v-card-text>
    </v-card>
</template>

<script>
import ProfileTreeBranch from './ProfileTreeBranch.vue'

const profileTreeId = `profile-tree-${+new Date()}`
const changeProfileTreeHeight = () => {
    const ptree = document.getElementById(profileTreeId)
    const rect = ptree.getBoundingClientRect()
    const height = window.innerHeight - rect.y - 15
    ptree.style.height = height + 'px'
}

export default {
    name: 'ProfileTree',
    data(){
        return {
            _items: [],
            divId: profileTreeId,
        }
    },
    inject: ['context', 'locale'],
    props: {
        ctxmenus: {
            type: Object,
            default: {
                data: [],
                components: [],
                values: [],
                documents: [],
                dashboards: [],
            }
        },
    },
    emits: ['profile-item-selected', 'profile-item-delete'],
    methods: {
        emitSelected(itemProps){
            this.$emit('profile-item-selected', itemProps)
        },
        emitDelete(event){
            this.$emit('profile-item-delete', event)
        },
    },
    computed: {
        ctxTables(){
            return Object.values(this.context.components).filter(
                cmp => cmp.type === 'table'
            )
        },
        ctxFigures(){
            return Object.values(this.context.components).filter(
                cmp => cmp.type === 'figure'
            )
        },
        ctxValues(){
            return Object.values(this.context.values)
        },
        ctxDocuments(){
            return Object.values(this.context.documents)
        },
        ctxDashboards(){
            return Object.values(this.context.dashboards)
        },
    },
    mounted(){
        changeProfileTreeHeight()
        addEventListener('resize', changeProfileTreeHeight)
    },
    unmounted(){
        removeEventListener('resize', changeProfileTreeHeight)
    },
    components: {
        ProfileTreeBranch,
    },
}
</script>

<style scoped>
.v-list {
    --indent-padding: none!important;
}
</style>