<template>
  <div class="header">
    <div class="left">
      <h3>Admin System</h3>
    </div>

    <div class="right">
      <span class="user">Admin</span>
      <el-button type="text">退出</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
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