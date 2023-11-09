// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import NoofaEditor from '@/components/NoofaEditor.vue'
import NoofaDashboard from '@/components/NoofaDashboard.vue'

const routes = [
  {
    path: '/',
    component: NoofaEditor,
    name: 'Home',
  },
  {
    path: '/dashboard/:dashId',
    component: NoofaDashboard,
    name: 'Dashboard',
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
