import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin/dashboard'
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },

  {
    path: '/admin',
    name: 'Admin', 
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/dashboard/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/admin/user/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router