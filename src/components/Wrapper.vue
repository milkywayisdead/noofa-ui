<template>
    <slot name="content"></slot>
</template>

<script>
import api from '../utils/api/api.js'
import NoofaCtx from '../utils/context/context.js'
import { DEFAULT_LOCALE, getLocale } from '../utils/locales/locales.js'

export default {
    name: 'Wrapper',
    data(){
        const locale = getLocale(
            this.getLocaleName()
        )

        return {
            locale: locale,
            context: new NoofaCtx({
                defaultName: locale.profiles.defaultName,
            }),
            api: api,
        }
    },
    methods: {
        getLocaleName(){
            const l = localStorage.getItem('noofaLocale')
            return l ?? DEFAULT_LOCALE
        },
    },
    provide(){
        return {
            locale: this.locale,
            context: this.context,
            api: this.api,
        }
    },
}
</script>