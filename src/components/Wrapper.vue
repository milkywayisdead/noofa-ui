<template>
    <slot name="content"></slot>
</template>

<script>
import api from '../utils/api/api.js'
import NoofaCtx from '../utils/context/context.js'
import {getLocale} from '../utils/locales/locales.js'

export default {
    name: 'Wrapper',
    data(){
        const locale = getLocale('ru')
        return {
            locale: locale,
            context: new NoofaCtx({
                defaultName: locale.profiles.defaultName,
            }),
            api: api,
        }
    },
    provide(){
        return {
            locale: this.locale,
            context: this.context,
            api: this.api
        }
    },
}
</script>