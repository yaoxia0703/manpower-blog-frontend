import { defineStore } from "pinia";
import type { LoginUser } from "@/types/auth/loginUser";


// 定义用户状态管理
export const useUserStore = defineStore('user', {
    // 定义状态
    state: () => ({
        user: null as LoginUser | null,// 用户信息
        token: '' as string// 认证令牌
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
        }
    }
})