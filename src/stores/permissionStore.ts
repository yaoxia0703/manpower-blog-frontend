import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/system/menu'
import { MenuType } from '@/types/enums/menu'

/**
 * メニュー再帰検索処理
 * メニュー情報およびパンくずパスを取得する
 */
function findMenuRecursive(
    menus: MenuItem[],
    targetPath: string,
    parentPath: MenuItem[] = [],
): { node?: MenuItem; path?: MenuItem[] } | null {
    for (const menu of menus) {
        const currentPath = [...parentPath, menu]

        // 対象メニュー一致
        if (menu.path === targetPath) {
            return {
                node: menu,
                path: currentPath,
            }
        }

        // 子メニュー再帰検索
        if (menu.children?.length) {
            const result = findMenuRecursive(
                menu.children,
                targetPath,
                currentPath,
            )

            if (result) {
                return result
            }
        }
    }

    return null
}

/**
 * 権限状態管理Store
 * メニュー・権限情報を管理する
 */
export const usePermissionStore = defineStore(
    'permission',
    {
        state: () => ({
            menus: [] as MenuItem[],
            permissions: [] as string[],
            loaded: false as boolean,
        }),

        actions: {
            /**
             * メニュー一覧設定
             */
            setMenus(menus: MenuItem[]) {
                this.menus = menus
            },

            /**
             * 権限一覧設定
             */
            setPermissions(permissions: string[]) {
                this.permissions = permissions
            },

            /**
             * 読み込み状態設定
             */
            setLoaded(loaded: boolean) {
                this.loaded = loaded
            },

            /**
             * 権限情報初期化
             */
            clearPermissions() {
                this.menus = []
                this.permissions = []
                this.loaded = false
            },

            /**
             * パスから単一メニューを取得する
             * ルートガードおよび権限制御用
             */
            findMenuByPath(path: string): MenuItem | null {
                const result = findMenuRecursive(
                    this.menus,
                    path,
                )

                return result?.node || null
            },

            /**
             * 権限判定
             */
            hasPermission(
                permission: string | string[],
            ): boolean {
                if (!permission) {
                    return true
                }

                // OR判定
                if (Array.isArray(permission)) {
                    return permission.some(p =>
                        this.permissions.includes(p),
                    )
                }

                return this.permissions.includes(permission)
            },

            /**
             * パンくずリスト用メニューパス取得
             */
            findMenuPath(path: string): MenuItem[] {
                const result = findMenuRecursive(
                    this.menus,
                    path,
                )

                return (result?.path || []).filter(
                    item => item.type !== MenuType.BUTTON,
                )
            },
        },
    },
)