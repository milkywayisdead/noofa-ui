<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.documents.new" 
        activator-icon="mdi-file-pdf-box"
        @close="reset"
    >
        <template v-slot:content>
            <v-row>
                <v-col cols="12">
                    <noo-text-field 
                        :label="locale.documents.name"
                        v-model="name" />
                </v-col>
                <v-col cols="12">
                    <v-select 
                        :items="ctxComponents"
                        v-model="components"
                        :label="locale.documents.components"
                        chips
                        clearable
                        multiple 
                        closable-chips />
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn @click="addDoc"
                :disabled="!saveBtnEnabled">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'

export default {
    name: 'NewDocumentDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            name: '',
            components: [],
        }
    },
    methods: {
        reset(){
            this.name = ''
            this.components = []
        },
        addDoc(){
            const doc = this.context.addDocument(this.toConf())
            if(this.context.hasId()){
                this.api.partialUpdate(this.context.id, 'doc', doc.id, doc.compile())
                    .then(res => {})
                    .catch(err => {
                        this.snackbar.error(
                            this.locale.messages.errorWhenSavingDocument
                        )
                    })
                    .finally(_ => {
                        this.$refs.baseDialog.close()
                    })
            } else {
                this.$refs.baseDialog.close()
            }
        },
        toConf(){
            return {
                id: `doc${+ new Date()}`,
                name: this.name,
                components: this.components,
            }
        },
    },
    computed: {
        ctxComponents(){
            return Object.values(this.context.components)
                .map(c => {
                    return {
                        title: c.name,
                        value: c.id,
                    }
                })
        },
        saveBtnEnabled(){
            return this.name.length && this.components.length
        },
    },
    components: {
        NooTextField,
    },
}
</script>