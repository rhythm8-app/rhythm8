import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('../views/GroupsView.vue')
    },
    {
      path: '/training',
      name: 'training',
      component: () => import('../views/TrainingView.vue')
    },
    {
      path: '/travel',
      name: 'travel',
      component: () => import('../views/TravelView.vue')
    }
  ]
})

export default router