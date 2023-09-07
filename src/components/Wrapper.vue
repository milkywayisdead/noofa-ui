<template>
    <slot name="content"></slot>
</template>

<script>
import {getLocale} from '../utils/locales/locales.js'

export default {
    name: 'Wrapper',
    data(){
        return {
            locale: getLocale('ru'),
        }
    },
    provide(){
        return {
            locale: this.locale,
        }
    },
}
</script>