<template>
    <slot name="content"></slot>
</template>

<script>
import api from '../utils/api/api.js'
import {getLocale} from '../utils/locales/locales.js'

export default {
    name: 'Wrapper',
    data(){
        return {
            locale: getLocale('ru'),
            api: api,
        }
    },
    provide(){
        return {
            api: this.api,
            locale: this.locale,
        }
    },
}
</script>