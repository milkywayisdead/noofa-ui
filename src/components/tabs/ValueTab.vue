<template>
    <v-toolbar density="compact">
        <icon-button ref="saveButton"
            icon="mdi-content-save"
            :tooltip="locale.actions.save"
            @click="updateValue" />
        <delete-confirmation-dialog 
            :item-id="id"
            :item-name="name"
            :item-group="itemGroup"
            :item-group-plural="'values'"
            @item-delete="emitItemDelete($event)"
        />
        <icon-button icon="mdi-play"
            :tooltip="locale.values.run" 
            @click="getValue" />
    </v-toolbar>
    <v-row class="mt-2 rigid-row" :id="rowContainerId">
        <v-col cols="3">
            <v-row>
                <v-col cols="12">
                    <noo-text-field
                        v-model="name"
                        :label="locale.values.name"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        :label="locale.values.expression"
                        v-model="expression" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        :label="locale.values.result"
                        v-model="result" />
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
    name: 'ValueTab',
    mixins: [tabMixin],
    data(){
        const props = this.itemProps
        const tabProps = {
            id: props.id,
            name: props.name,
            expression: props.value,
            result: '',
            itemGroup: 'value',
        }

        return tabProps
    },
    methods: {
        updateValue(){
            const value = this.context.updateValue(this.id, this.toConf())
            this.updateItem(value)   
        },
        getValue(){
            this.enterLoadingState()
            this.result = ''

            this.api.getValue(this.context.id, this.name)
                .then(res => {
                    this.result = res.data.is_simple ?
                            res.data.value :
                            this.locale.messages.valueCantBeDisplayed
                    this.snackbarOnItemBuildSuccess()
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
                value: this.expression,
            }
            return conf
        },
    },
    computed: {
        saveBtnEnabled(){
            return this.name.length && this.expression.length
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