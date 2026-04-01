import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

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
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/dashboard/index.vue'),
        meta: { title: 'ダッシュボード' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/admin/user/index.vue'),
        meta: { title: 'ユーザー管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const token = userStore.getToken()

  // 1. 已登录访问 login → 跳首页
  if (to.path === '/login' && token) {
    return '/admin/dashboard'
  }

  // 2. 需要登录但没 token
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  // 3. 恢复用户
  if (token && !userStore.user) {
    try {
      await userStore.fetchUser()
    } catch {
      userStore.clearUser()
      return '/login'
    }
  }

  // 4. 放行
  return true
})

export default router