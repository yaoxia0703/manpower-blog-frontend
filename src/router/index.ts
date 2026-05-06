import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permissionStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/system/dashboard'
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },

  {
    path: '/system',
    name: 'System',
    component: () => import('@/layouts/system/SystemLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/system/dashboard/index.vue'),
        meta: { title: 'ダッシュボード' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: 'ユーザー管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: 'ロール管理' }
      },
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
  const permissionStore = usePermissionStore()

  // 1. 已登录访问 login → 跳首页
  if (to.path === '/login' && token) {
    return '/system/dashboard'
  }

  // 2. 判断是否需要登录
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
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

  //4. 做 menu 判断
  if (requiresAuth) {
    const menu = permissionStore.findMenuByPath(to.path)

    // if (!menu) {
    //   return '/404' // 没有权限访问，跳转到 404 页面
    // }
    // 公共error尚未实现，暂时先登出回登录页
    console.log('menu', menu)
    if (!menu) {//
      await userStore.logout()
      return '/login'
    }
    // 这里可以根据 menu.permission 来判断是否有权限访问
    const permission = permissionStore.permissions;
    const permissionCode = menu.permission

    console.log('permission', permission)
    console.log('permissionCode', permissionCode)
    if (permissionCode && !permissionStore.hasPermission(permissionCode)) {
      await userStore.logout()
      return '/login'
    }
  }

  // 5. 放行
  return true
})

export default router