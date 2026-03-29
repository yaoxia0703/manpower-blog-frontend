<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <p>这是首页</p>

    <button @click="goLogin">返回登录</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.dashboard-container {
  padding: 40px;
}
</style>