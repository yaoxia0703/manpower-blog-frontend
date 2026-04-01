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
        // 生成动态路由
    }
})
