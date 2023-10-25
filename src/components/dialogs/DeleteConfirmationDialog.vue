<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.actions.itemDelete"
        activator-icon="mdi-delete"
        :width="'40%'"
        :tooltip="locale.actions.delete"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <p>{{ locale.messages.itemDelete }}</p>
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn @click="deleteItem">{{ locale.actions.delete }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'DeleteConfirmationDialog',
    mixins: [dialogMixin, ],
    data(){
        return {
            profiles: [],
        }
    },
    props: {
        itemName: {
            type: String,
        },
        itemId: {
            type: String,
        },
        itemGroup: {
            type: String,
        },
        itemGroupPlural: {
            type: String
        },
    },
    emits: ['item-delete'],
    methods: {
        reset(){
            this.profiles = []
        },
        deleteItem(){
            if(!this.context.hasId()){
                this.context.deleteItem(this.itemGroupPlural, this.itemId)
                this.$emit('item-delete', this.itemId)
                this.$refs.baseDialog.close()
                return
            }

            const item = this.context.getItem(this.itemGroupPlural, this.itemId)
            this.api.partialDelete(this.context.id, this.itemGroup, item.id)
                .then(res => {
                    if(res.status === 200){
                        this.context.deleteItem(this.itemGroupPlural, this.itemId)
                        this.$emit('item-delete', this.itemId)
                    }
                })
                .finally(_ => {
                    try {
                        this.$refs.baseDialog.close()
                    } catch {}
                })
        },
    },
}
</script>