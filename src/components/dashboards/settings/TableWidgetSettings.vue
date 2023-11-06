<template>
<v-expansion-panel  :title="panelTitle">
</v-expansion-panel>
</template>

<script>
import { widgetSettingsMixin } from '@/utils/mixins/widgets.js'

export default {
    name: 'TableWidgetSettings',
    mixins: [widgetSettingsMixin, ],
    data(){
        return {

        }
    },
}
</script>`