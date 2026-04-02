import { defineStore } from "pinia";
import type { MenuItem } from "@/types/system/menu";

// 定义权限状态管理
export const usePermissionStore = defineStore('permission', {
    // 定义状态
    state: () => ({
        menus: [] as MenuItem[],// 菜单列表
        permissions: [] as string[],// 权限列表
        loaded: false as boolean// 加载状态
    }),
    // 定义方法
    actions: {
        // 设置菜单列表
        setMenus(menus: MenuItem[]) {
            this.menus = menus
        },
        // 设置权限列表
        setPermissions(permissions: string[]) {
            this.permissions = permissions
        },
        // 设置加载状态
        setLoaded(loaded: boolean) {
            this.loaded = loaded
        },
        // 清除权限信息
        clearPermissions() {
            this.menus = []
            this.permissions = []
            this.loaded = false
        },
        //根据路径查找菜单（递归）
        findMenuByPath(path: string, menus: MenuItem[]): MenuItem | null {// 这里的菜单类型可以根据实际情况调整
            for (const menu of menus) {// 遍历菜单列表
                if (menu.path === path) {// 如果找到匹配的路径，返回菜单项
                    return menu
                }

                if (menu.children?.length) {// 如果有子菜单，递归查找
                    const found = this.findMenuByPath(path, menu.children)// 如果在子菜单中找到，返回结果
                    if (found) return found
                }
            }

            return null
        },        
        // 判断是否有某个权限
        hasPermission(permission: string | string[]): boolean {
            if (!permission) return true

            console.log('hasPermission:permission', permission);
            // 如果传入的是数组，判断是否有任一权限
            if (Array.isArray(permission)) {
                return permission.some(p => this.permissions.includes(p))
            }
            // 如果传入的是字符串，直接判断是否包含
            return this.permissions.includes(permission)
        }

    }
})
