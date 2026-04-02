import { defineStore } from "pinia";
import type { LoginUser } from "@/types/auth/loginUser";
import { getMeApi, logoutApi } from "@/api/auth/auth";
import router from "@/router";
import { ElMessage } from "element-plus";
import { usePermissionStore } from "@/stores/permissionStore";


// 定义用户状态管理
export const useUserStore = defineStore('user', {
    // 定义状态
    state: () => ({
        user: null as LoginUser | null,// 用户信息
        token: '' as string,// 认证令牌
        loading: false as boolean,// 加载状态
    }),
    // 定义方法
    actions: {
        // 设置认证令牌
        setToken(token: string) {
            this.token = token;
            sessionStorage.setItem('token', token);// 将令牌存储在 sessionStorage 中
        },
        // 设置用户信息
        setUser(user: LoginUser) {
            this.user = user;
            sessionStorage.setItem('user', JSON.stringify(user));// 将用户信息存储在 sessionStorage 中
        },
        // 获取认证令牌
        getToken() {
            // 优先从 Pinia 状态中获取令牌，如果没有则从 sessionStorage 中获取
            return this.token || sessionStorage.getItem('token') || '';
        },
        // 获取用户信息
        getUser() {
            // 优先从 Pinia 状态中获取用户信息，如果没有则从 sessionStorage 中获取
            if (this.user) return this.user
            const userStr = sessionStorage.getItem('user')
            return userStr ? JSON.parse(userStr) : null
        },
        // 清除用户信息和认证令牌
        clearUser() {
            this.user = null;
            this.token = '';
            sessionStorage.removeItem('token');// 从 sessionStorage 中移除令牌
            sessionStorage.removeItem('user');// 从 sessionStorage 中移除用户信息
        },
        async logout() {
            try {
                await logoutApi()// 调用登出接口
                ElMessage.success('ログアウトしました')// 显示登出成功消息
            } catch (error) {
                console.error('Logout failed:', error)
            } finally {
                this.clearUser()// 无论登出接口调用成功与否，都清除用户信息和认证令牌
                const permissionStore = usePermissionStore()// 获取权限状态管理实例
                permissionStore.clearPermissions()// 清除权限信息
                router.replace('/login')// 无论登出接口调用成功与否，都跳转到登录页
            }
        },
        async fetchUser() {
            if (this.loading) return // 避免重复请求
            this.loading = true// 设置加载状态
            const permissionStore = usePermissionStore()// 获取权限状态管理实例
            try {
                const res = await getMeApi()
                const result = res.data
                const resultData = result.data
                console.log('fetchUser result:', result)
                if (result.code === 200) {
                    
                    //覆盖用户（关键）
                    this.setUser(resultData.user)      
                    permissionStore.setMenus(resultData.menus)// 设置菜单列表
                    permissionStore.setPermissions(resultData.permissions)// 设置权限列表
                    permissionStore.setLoaded(true)// 设置加载状态为已加载              
                } else {
                    //  token 无效
                    this.clearUser()
                    throw new Error(result.message || 'Failed to fetch user info')
                }
            } catch (error) {
                console.error('fetchUser failed:', error)

                //  失败说明未登录 / token 失效
                this.clearUser()
                permissionStore.clearPermissions()// 清除权限信息
                throw error
            } finally {
                this.loading = false// 重置加载状态
            }
        },
        // async refreshUser() {
        //     try {
        //         await this.fetchUser()// 刷新用户信息
        //         ElMessage.success('ユーザー情報を更新しました')// 显示刷新成功消息
        //     } catch (error) {
        //         console.error('refreshUser failed:', error)
        //         ElMessage.error('ユーザー情報の更新に失敗しました')// 显示刷新失败消息
        //     }
        // }
    }
})