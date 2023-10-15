<template>
    <base-dialog
        ref="baseDialog"
        :title="locale.figures.datasets" 
        activator-icon="mdi-list-box-outline"
        @close="reset"
    >
        <template v-slot:content>
            <conf-items-list ref="datasetsList"
                @item-add="this.mode = 'add'" 
                @item-edit="handleEdit"
                @item-delete="handleDelete" 
                @mounted="updateList" />
            <v-row v-if="isEditing">
                <v-col cols="12">
                    <noo-text-field :label="locale.figures.datasetName" 
                        v-model="datasetName" />
                </v-col>
                <v-col cols="12">
                    <v-textarea :label="locale.figures.datasetXExpression" 
                        v-model="datasetXExpression" />
                </v-col>
                <v-col cols="12" v-if="usingXY">
                    <v-textarea :label="locale.figures.datasetYExpression" 
                        v-model="datasetYExpression" />
                </v-col>
                <v-col cols="12">
                    <v-btn v-if="mode === 'add'"
                        @click="addDataset"
                        :disabled="!addButtonIsEnabled" >
                        {{ locale.actions.add }}
                    </v-btn>
                    <v-btn v-if="mode === 'edit'"
                        @click="updateDataset"
                        :disabled="!addButtonIsEnabled" >
                        {{ locale.actions.save }}
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
            <v-btn @click="emitUpdateAndClose">{{ locale.actions.save }}</v-btn>
        </template>
    </base-dialog>
</template>

<script>
import NooTextField from '@/components/inputs/NooTextField.vue'
import NooSelect from '@/components/inputs/NooSelect.vue'
import { dialogMixin } from '@/utils/mixins/dialogs'
import ConfItemsList from '@/components/misc/ConfItemsList.vue'

export default {
    name: 'DatasetsDialog',
    mixins: [dialogMixin,],
    data(){
        return {
            datasetName: '',
            datasetXExpression: '',
            datasetYExpression: '',
            from: 'expression',
            activatorDisabled: false,
            mode: 'idle',
            datasets: [],
            usingXY: true,
        }
    },
    emits: ['datasets-updated'],
    methods: {
        addDataset(){
            this.datasets.push(this.toConf())
            this.reset()
            this.updateList()
        },
        updateDataset(dsIdx){
            this.datasets[dsIdx] = this.toConf()
            this.reset()
            this.updateList()
        },
        handleEdit(dsIdx){
            const ds = this.datasets[dsIdx]
            if(!ds){
                return
            }

            this.mode = 'edit'
            this.datasetName = ds.name
            if(this.usingOneValueDataset){
                this.datasetXExpression = ds.value
                return
            }
            this.datasetXExpression = ds.x
            this.datasetYExpression = ds.y
        },
        handleDelete(dsIdx){
            this.datasets = this.datasets.filter((ds, idx) => idx !== dsIdx)
            this.reset()
            this.updateList()
        },
        updateList(){
            if(!this.$refs.datasetsList) return

            this.$refs.datasetsList.updateItems(
                this.itemsToStr()
            )  
        },
        toConf(){
            if(this.usingOneValueDataset){
                return {
                    name: this.name,
                    value: this.datasetXExpression,
                }
            }

            return {
                name: this.datasetName,
                x_from: this.from,
                y_from: this.from,
                x: this.datasetXExpression,
                y: this.datasetYExpression,
            }
        },
        reset(){
            for(let prop of [
                'datasetName', 'datasetXExpression',
                'datasetYExpression',
            ]){
                this[prop] = ''
            }
            this.mode = 'idle'
        },
        itemsToStr(){
            return this.datasets.map(
                ds => ds.name
            )
        },
        emitUpdateAndClose(){
            this.$emit('datasets-updated', this.datasets)
            this.$refs.baseDialog.close()
        },
    },
    computed: {
        isEditing(){
            return ['add', 'edit'].includes(this.mode)
        },
        usingOneValueDataset(){
            return !this.usingXY
        },
        addButtonIsEnabled(){
            const dsName = this.datasetName.length > 0
            if(this.usingOneValueDataset){
                return dsName && this.datasetXExpression.length > 0
            }
            return dsName && 
                this.datasetXExpression.length > 0 &&
                this.datasetYExpression.length > 0
        },
    },
    watch: {
        activatorDisabled(n){
            this.$refs.baseDialog.activatorDisabled = n
        },
    },
    components: {
        NooTextField,
        NooSelect,
        ConfItemsList,
    },
}
</script>