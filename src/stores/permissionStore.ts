import { defineStore } from "pinia";
import type { MenuItem } from "@/types/system/menu";
import { MenuType } from "@/types/enums/menu";

// 抽取通用递归函数
function findMenuRecursive(
    menus: MenuItem[],
    targetPath: string,
    parentPath: MenuItem[] = []
): { node?: MenuItem; path?: MenuItem[] } | null {
    for (const menu of menus) {
        const currentPath = [...parentPath, menu];

        if (menu.path === targetPath) {
            return {
                node: menu,
                path: currentPath
            };
        }

        if (menu.children?.length) {
            const result = findMenuRecursive(menu.children, targetPath, currentPath);
            if (result) return result;
        }
    }

    return null;
}

// 定义权限状态管理
export const usePermissionStore = defineStore('permission', {
    state: () => ({
        menus: [] as MenuItem[],
        permissions: [] as string[],
        loaded: false as boolean
    }),

    actions: {
        setMenus(menus: MenuItem[]) {
            this.menus = menus;
        },

        setPermissions(permissions: string[]) {
            this.permissions = permissions;
        },

        setLoaded(loaded: boolean) {
            this.loaded = loaded;
        },

        clearPermissions() {
            this.menus = [];
            this.permissions = [];
            this.loaded = false;
        },

        /**
         * 查单个菜单（路由守卫 / 权限判断用）
         */
        findMenuByPath(path: string): MenuItem | null {
            const result = findMenuRecursive(this.menus, path);
            return result?.node || null;
        },

        /**
         * 判断权限
         */
        hasPermission(permission: string | string[]): boolean {
            if (!permission) return true;

            if (Array.isArray(permission)) {
                return permission.some(p => this.permissions.includes(p));
            }

            return this.permissions.includes(permission);
        },

        /**
         * 面包屑路径
         */
        findMenuPath(path: string): MenuItem[] {
            const result = findMenuRecursive(this.menus, path);

            return (result?.path || []).filter(
                item => item.type !== MenuType.BUTTON
            );
        }
    }
});