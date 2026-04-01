<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <p>这是首页</p>

    <button @click="goLogin">返回登录</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const goLogin = async () => {
  await userStore.logout()// 调用登出方法，清除用户信息和认证令牌
}
</script>

<style scoped>
.dashboard-container {
  padding: 40px;
}
</style>