// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Editor from '@/components/Editor.vue'

const routes = [
  {
    path: '/',
    component: Editor,
    name: 'Home',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
