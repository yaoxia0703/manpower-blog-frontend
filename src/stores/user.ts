import { defineStore } from 'pinia'
import type { LoginUser } from '@/types/auth/loginUser'
import { getMeApi, logoutApi } from '@/api/auth/auth'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { usePermissionStore } from '@/stores/permissionStore'

/**
 * ユーザー状態管理Store
 * ログインユーザー情報および認証状態を管理する
 */
export const useUserStore = defineStore('user', {
    /**
     * 状態定義
     */
    state: () => ({
        user: null as LoginUser | null, // ユーザー情報
        token: '' as string, // JWTトークン
        loading: false as boolean, // 読み込み状態
    }),

    /**
     * 操作定義
     */
    actions: {
        /**
         * JWTトークン設定
         */
        setToken(token: string) {
            this.token = token

            // SessionStorageへ保存
            sessionStorage.setItem('token', token)
        },

        /**
         * ユーザー情報設定
         */
        setUser(user: LoginUser) {
            this.user = user

            // SessionStorageへ保存
            sessionStorage.setItem(
                'user',
                JSON.stringify(user),
            )
        },

        /**
         * JWTトークン取得
         * Pinia優先、未存在時はSessionStorageから取得する
         */
        getToken() {
            return (
                this.token ||
                sessionStorage.getItem('token') ||
                ''
            )
        },

        /**
         * ユーザー情報取得
         * Pinia優先、未存在時はSessionStorageから復元する
         */
        getUser() {
            if (this.user) {
                return this.user
            }

            const userStr = sessionStorage.getItem('user')

            return userStr
                ? JSON.parse(userStr)
                : null
        },

        /**
         * ユーザー情報初期化
         * JWTトークンおよびユーザー情報を削除する
         */
        clearUser() {
            this.user = null
            this.token = ''

            // SessionStorage削除
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
        },

        /**
         * ログアウト処理
         */
        async logout() {
            try {
                // ログアウトAPI呼び出し
                await logoutApi()

                ElMessage.success(
                    'ログアウトしました',
                )
            } catch (error) {
                console.error(
                    'Logout failed:',
                    error,
                )
            } finally {
                // ローカル状態クリア
                this.clearUser()

                const permissionStore =
                    usePermissionStore()

                // 権限情報クリア
                permissionStore.clearPermissions()

                // ログイン画面へ遷移
                router.replace('/login')
            }
        },

        /**
         * ログインユーザー情報取得
         * メニュー・権限情報も同時に初期化する
         */
        async fetchUser() {
            // 重複リクエスト防止
            if (this.loading) {
                return
            }

            this.loading = true

            const permissionStore =
                usePermissionStore()

            try {
                const res = await getMeApi()

                const result = res.data
                const resultData = result.data

                console.log(
                    'fetchUser result:',
                    result,
                )

                if (result.code === 200) {
                    // ユーザー情報更新
                    this.setUser(resultData.user)

                    // メニュー一覧設定
                    permissionStore.setMenus(
                        resultData.menus,
                    )

                    // 権限一覧設定
                    permissionStore.setPermissions(
                        resultData.permissions,
                    )

                    // 読み込み完了
                    permissionStore.setLoaded(true)
                } else {
                    // token無効
                    this.clearUser()

                    throw new Error(
                        result.message ||
                        'Failed to fetch user info',
                    )
                }
            } catch (error) {
                console.error(
                    'fetchUser failed:',
                    error,
                )

                // 未ログインまたはtoken失効
                this.clearUser()

                // 権限情報初期化
                permissionStore.clearPermissions()

                throw error
            } finally {
                // 読み込み状態解除
                this.loading = false
            }
        },

        // /**
        //  * ユーザー情報再取得
        //  */
        // async refreshUser() {
        //   try {
        //     await this.fetchUser()

        //     ElMessage.success(
        //       'ユーザー情報を更新しました',
        //     )
        //   } catch (error) {
        //     console.error(
        //       'refreshUser failed:',
        //       error,
        //     )

        //     ElMessage.error(
        //       'ユーザー情報の更新に失敗しました',
        //     )
        //   }
        // }
    },
})