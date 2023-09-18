<template>
    <v-card 
        rounded 
        elevation="12" 
        :id="divId">
        <v-toolbar color="teal-darken-3" density="compact">
            <v-toolbar-title>{{ context.name }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <profile-tree-branch 
                :subheader="locale.profiles.data"
                icon="mdi-database"
                @profile-item-selected="emitSelected"
            >
                <template v-slot:items>
                    <profile-tree-branch 
                        :subheader="locale.sources.plural"
                        icon="mdi-database-export"
                        :items="context.sources"
                        item-type="source"
                        @profile-item-selected="emitSelected"
                    />
                    <profile-tree-branch 
                        :subheader="locale.queries.plural"
                        icon="mdi-database-search"
                        :items="context.queries"
                        item-type="query"
                        @profile-item-selected="emitSelected"
                    />
                    <profile-tree-branch 
                        :subheader="locale.dataframes.plural"
                        icon="mdi-application-array"
                        :items="context.dataframes"
                        item-type="dataframe"
                        @profile-item-selected="emitSelected"
                    />
                </template>
            </profile-tree-branch>
            <profile-tree-branch 
                :subheader="locale.profiles.components"
                icon="mdi-chart-box"
                @profile-item-selected="emitSelected"
            >
                <template v-slot:items>
                    <profile-tree-branch 
                        :subheader="locale.tables.plural"
                        icon="mdi-table"
                        :items="context.tables"
                        item-type="table"
                        @profile-item-selected="emitSelected"
                    />
                    <profile-tree-branch 
                        :subheader="locale.figures.plural"
                        icon="mdi-chart-line"
                        :items="context.figures"
                        item-type="figure"
                        @profile-item-selected="emitSelected"
                    />
                </template>
            </profile-tree-branch>
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
    emits: ['profile-item-selected'],
    methods: {
        emitSelected(itemProps){
            this.$emit('profile-item-selected', itemProps)
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