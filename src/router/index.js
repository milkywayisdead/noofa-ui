// Composables
import { createRouter, createWebHistory } from 'vue-router'
import NoofaEditor from '@/components/NoofaEditor.vue'

const routes = [
  {
    path: '/',
    component: NoofaEditor,
    name: 'Home',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
