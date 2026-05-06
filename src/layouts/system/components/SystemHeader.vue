<template>
  <div class="header">
    <div class="left">
      <h3>Admin System</h3>
    </div>

    <div class="right">
      <span class="user">Admin</span>
      <el-button type="danger" @click="goLogin">退出</el-button>
    </div>
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
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>