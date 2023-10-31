<template>
    <base-dialog
        :title="locale.profiles.open"
        activator-icon="mdi-folder-open"
        :on-open="getProfiles"
        @close="reset"
        :width="'40%'"
        ref="baseDialog"
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="profile in profiles" 
                                :key="profile.id"
                                @click="openProfile(profile.id)"
                                style="cursor: pointer"
                            >
                                <td>{{ profile.name }}</td>
                                <td>{{ profile.created }}</td>
                                <td>{{ profile.last_update }}</td>
                                <td><v-icon @click.stop="deleteProfile(profile.id)">mdi-delete</v-icon></td>
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
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'OpenProfileDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            profiles: [],
        }
    },
    emits: ['profile-selected'],
    methods: {
        getProfiles(){
            this.api.profilesDetails()
                .then(res => {
                    this.profiles = res.data
                }).catch(err => {
                    this.profiles = []
                    this.snackbar.error(this.locale.messages.unableToListProfiles)
                })
        },
        reset(){
            this.profiles = []
        },
        openProfile(profileId){
            this.$emit('profile-selected')
            this.api.getProfile(profileId)
                .then(res => {
                    if(res.status === 200){
                        try {
                            this.context.update(res.data)
                        } catch(err){
                            this.snackbar.error(this.locale.messages.unableToGetProfile)
                        }
                    }
                    this.$refs.baseDialog.close()
                }).catch(err => {
                    this.snackbar.error(this.locale.messages.unableToGetProfile)
                })
        },
        deleteProfile(profileId){
            this.api.deleteProfile(profileId)
                .then(res => {
                    if(res.status === 200){
                        this.profiles = this.profiles.filter(p => p.id !== profileId)
                    }
                }).catch(err => {
                    this.snackbar.error(this.locale.messages.errorWhenDeletingProfile)
                })
        },
    },
}
</script>