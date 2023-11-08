<template>
<v-card :style="positionStyle + sizeStyle" style="overflow:auto" class="noo-dashboard-widget">
    <v-card-title class="prevent-select">{{ title }}</v-card-title>
    <v-card-text style="height:100%;width:100%;padding:4px">
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
</template>

<script>
import dashboardWidgetMixin from '@/utils/mixins/dashwidgets.js'

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
import 'datatables.net-buttons'
import 'datatables.net-buttons/js/buttons.html5'
import jszip from 'jszip'

DataTable.use(DataTablesCore)
DataTablesCore.Buttons.jszip(jszip)

export default {
    name: 'TableWidget',
    mixins: [dashboardWidgetMixin, ],
    data(){
        const props = this.widgetProps

        return {
            title: props.props.title,

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