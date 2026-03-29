<template>
  <el-container class="layout">
    <!-- Header -->
    <el-header class="layout-header">
      <AdminHeader />
    </el-header>

    <el-container>
      <!-- Sidebar -->
      <el-aside width="200px" class="layout-sidebar">
        <AdminSidebar />
      </el-aside>

      <!-- Main -->
      <el-main class="layout-main">
        <AdminMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AdminHeader from './components/AdminHeader.vue'
import AdminSidebar from './components/AdminSidebar.vue'
import AdminMain from './components/AdminMain.vue'
</script>

<style scoped>
.layout {
  height: 100vh;
}

.layout-header {
  background: #409eff;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.layout-sidebar {
  background: #001529;
  color: #fff;
}

.layout-main {
  background: #f5f7fa;
  padding: 20px;
}
</style>