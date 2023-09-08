<template>
    <v-card>
        <v-card-title>{{ context.name }}</v-card-title>
        <v-card-text>
            <profile-tree-branch 
                :subheader="locale.profiles.data"
                icon="mdi-database"
            >
                <template v-slot:items>
                    <profile-tree-branch 
                        :subheader="locale.sources.plural"
                        icon="mdi-database-export"
                        :items="context.sources"
                    />
                    <profile-tree-branch 
                        :subheader="locale.queries.plural"
                        icon="mdi-database-search"
                        :items="context.queries"
                    />
                    <profile-tree-branch 
                        :subheader="locale.dataframes.plural"
                        icon="mdi-application-array"
                        :items="context.dataframes"
                    />
                </template>
            </profile-tree-branch>
            <profile-tree-branch 
                :subheader="locale.profiles.components"
                icon="mdi-chart-box"
            >
                <template v-slot:items>
                    <profile-tree-branch 
                        :subheader="locale.tables.plural"
                        icon="mdi-table"
                        :items="context.tables"
                    />
                    <profile-tree-branch 
                        :subheader="locale.figures.plural"
                        icon="mdi-chart-line"
                        :items="context.figures"
                    />
                </template>
            </profile-tree-branch>
        </v-card-text>
    </v-card>
</template>

<script>
import ProfileTreeBranch from './ProfileTreeBranch.vue'

export default {
    name: 'ProfileTree',
    data(){
        return {
            _items: []
        }
    },
    inject: ['context', 'locale'],
    components: {
        ProfileTreeBranch,
    },
}
</script>