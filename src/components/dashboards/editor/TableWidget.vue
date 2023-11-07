<template>
<div :id="id"
    class="noo-widget prevent-select"
    :style="positionStyle + sizeStyle"
    @click="select"
    @contextmenu.prevent="contextMenu"
    @mousedown="select(), startDragging($event)">
    <v-card class="noo-table-widget-card">
        <v-card-title class="prevent-select">{{ title }}</v-card-title>
        <v-card-text style="height:100%;width:100%;padding:4px;overflow:scroll">
            <div :id="containerId">
                <data-table v-if="tableIsVisible" class="display table-bordered"
                    :options="tableOptions">
                    <thead>
                        <tr>
                            <th v-for="col in tableColumns" :key="col">
                                {{ col }}
                            </th>
                        </tr>   
                    </thead>
                </data-table>
            </div>
        </v-card-text>
    </v-card>
</div>
<widget-resizers v-if="editorMode && selected"
    ref="resizers"
    :widget="this" />
</template>

<script>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
import 'datatables.net-buttons'
import 'datatables.net-buttons/js/buttons.html5'
import jszip from 'jszip'

import { widgetMixin, draggableWidgetMixin } from '@/utils/mixins/widgets.js'

DataTable.use(DataTablesCore)
DataTablesCore.Buttons.jszip(jszip)

export default {
    name: 'TableWidget',
    mixins: [widgetMixin, draggableWidgetMixin],
    data(){
        const props = this.widgetProps

        return {
            type: 'table',
            tableId: props.props.tableId || '',
            title: props.props.title || '',

            containerId: `${props.id}-container`,
            tableOptions: {
                dom: 'tip',
                columns: [],
                data: [],
                order: [],
            },
            tableIsVisible: false,
            tableColumns: [],
        }
    },
    mounted(){
        this.getWidgetData()
    },
    methods: {
        getWidgetProps(){
            return {
                id: this.id,
                type: this.type,
                props: {
                    title: this.title,
                    tableId: this.tableId,
                },
                layout: this.layoutProps,
            }
        },
        updateContent(data){
            this.tableOptions.columns = data.columns.map(i => {
                return {data: i.replace('.', '\\.')}
            })
            this.tableColumns = data.columns.map(i => i)
            this.tableOptions.data = data.data

            this.tableIsVisible = true
        },
    },
    components: {
        DataTable,
    },
}
</script>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
</style>