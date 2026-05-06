import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permissionStore'

/**
 * 静的ルート定義
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/system/dashboard',
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
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
        meta: { title: 'ダッシュボード' },
      },

      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: 'ユーザー管理' },
      },

      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: 'ロール管理' },
      },
    ],
  },
]

/**
 * Vue Router インスタンス
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * グローバルルートガード
 * ログイン状態および権限チェックを行う
 */
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  const token = userStore.getToken()

  // ログイン済みユーザーがログイン画面へアクセスした場合
  if (to.path === '/login' && token) {
    return '/system/dashboard'
  }

  /**
   * 認証が必要なルートか判定
   */
  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth,
  )

  // 未ログインの場合はログイン画面へ遷移
  if (requiresAuth && !token) {
    return '/login'
  }

  /**
   * ページ更新時のユーザー情報復元
   */
  if (token && !userStore.user) {
    try {
      await userStore.fetchUser()
    } catch {
      userStore.clearUser()
      return '/login'
    }
  }

  /**
   * メニュー権限チェック
   */
  if (requiresAuth) {
    const menu = permissionStore.findMenuByPath(to.path)

    // メニュー未存在の場合
    // 共通エラーページ未実装のため、一旦ログアウトへ遷移
    console.log('menu', menu)

    if (!menu) {
      await userStore.logout()
      return '/login'
    }

    /**
     * 権限コードチェック
     */
    const permissions = permissionStore.permissions
    const permissionCode = menu.permission

    console.log('permissions', permissions)
    console.log('permissionCode', permissionCode)

    // 権限不足
    if (
      permissionCode &&
      !permissionStore.hasPermission(permissionCode)
    ) {
      await userStore.logout()
      return '/login'
    }
  }

  // ルート許可
  return true
})

export default router