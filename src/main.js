/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Vuetify
import 'vuetify/styles'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import router from './router'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

const app = createApp(App)
registerPlugins(app)

app.mount('#app')