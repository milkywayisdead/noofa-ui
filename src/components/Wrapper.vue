<template>
    <slot name="content"></slot>
    <snackbar ref="snackbar" />
    <ctx-menu ref="ctxmenu" />
</template>

<script>
import api from '../utils/api/api.js'
import NoofaCtx from '../utils/context/context.js'
import { DEFAULT_LOCALE, getLocale } from '../utils/locales/locales.js'
import Snackbar from '@/components/misc/Snackbar.vue'
import CtxMenu from '@/components/misc/CtxMenu.vue'

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
        infoMessage(message){
            this.showMessage(message, 'info')
        },
        errorMessage(message){
            this.showMessage(message, 'red')
        },
        successMessage(message){
            this.showMessage(message, 'success')
        },
        showMessage(message, color){
            this.$refs.snackbar.showMessage(message, color)
        },
        ctxmenu(){
            return this.$refs.ctxmenu
        },
    },
    provide(){
        return {
            locale: this.locale,
            context: this.context,
            api: this.api,
            snackbar: {
                info: this.infoMessage,
                error: this.errorMessage,
                success: this.successMessage,
            },
            ctxmenu: this.ctxmenu,
        }
    },
    components: {
        Snackbar,
        CtxMenu,
    },
}
</script>