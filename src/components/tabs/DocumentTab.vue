<template>
    <v-toolbar density="compact">
        <icon-button ref="saveButton"
            icon="mdi-content-save"
            :tooltip="locale.actions.save"
            @click="updateDocument" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'documents'"
            @item-delete="emitItemDelete($event)"
        />
        <icon-button icon="mdi-download"
            :tooltip="locale.documents.downloadPdf" 
            @click="download" />
    </v-toolbar>
    <v-row class="mt-2 rigid-row" :id="rowContainerId">
        <v-col cols="3">
            <v-row>
                <v-col cols="12">
                    <noo-text-field
                        v-model="name"
                        :label="locale.documents.name"
                    />
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
        </v-col>
    </v-row>
</template>

<script>
import NooTextField from '../inputs/NooTextField.vue'
import { tabMixin } from '@/utils/mixins/tabs'
import IconButton from '@/components/misc/IconButton.vue'

export default {
    name: 'DocumentTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            id: props.id,
            name: props.name,
            components: props.components,
            itemGroup: 'doc',
        }

        return tabProps
    },
    methods: {
        updateDocument(){
            const doc = this.context.updateDocument(this.id, this.toConf())
            this.updateItem(doc)   
        },
        download(){
            this.enterLoadingState()

            this.api.getDocument(this.context.id, this.id)
                .then(res => {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.pdf');
                    document.body.appendChild(link);
                    link.click();
                }).catch(err => {
                    this.snackbarOnItemBuildError()
                }).finally(() => {
                    this.exitLoadingState()
                })
        },
        toConf(){
            const conf = {
                id: this.id,
                name: this.name,
                components: this.components,
            }
            return conf
        },
    },
    computed: {
        ctxComponents(){
            return Object.values(this.context.components)
                .map(c => {
                    return {
                        title: c.name,
                        value: c.id
                    }
                })
        },
        saveBtnEnabled(){
            return this.name.length && this.components.length
        },
    },
    watch: {
        saveBtnEnabled(value){
            this.$refs.saveButton.setEnabledProp(value)
        },
    },
    components: {
        NooTextField,
        IconButton,
    }
}
</script>