import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/frontend/Home.vue'
import About from '@/views/frontend/About.vue'
import FrontendLayout from '@/layouts/Frontend.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FrontendLayout,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: FrontendLayout,
    children: [
      {
        path: '',
        component: About
      }
    ]
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
