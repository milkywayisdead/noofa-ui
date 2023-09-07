<template>
    <base-dialog
        :title="locale.profiles.open"
        activator-icon="mdi-folder-open"
        :on-open="getProfiles"
        @close="reset"
        :width="'40%'"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <v-table>
                        <thead>
                            <tr>
                                <th>{{ locale.profiles.name }}</th>
                                <th>{{ locale.profiles.created }}</th>
                                <th>{{ locale.profiles.lastUpdate }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="profile in profiles" :key="profile.id">
                                <td>{{ profile.name }}</td>
                                <td>{{ profile.created }}</td>
                                <td>{{ profile.last_update }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'

export default {
    name: 'OpenProfileDialog',
    data(){
        return {
            profiles: [],
        }
    },
    methods: {
        getProfiles(){
            this.api.profilesDetails()
                .then(res => {
                    this.profiles = res.data
                }).catch(err => {
                    this.profiles = []
                })
        },
        reset(){
            this.profiles = []
        }
    },
    inject: ['api', 'locale'],
    components: {
        BaseDialog,
    },
}
</script>