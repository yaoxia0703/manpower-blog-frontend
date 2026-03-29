<template>
  <el-menu
    default-active="/admin/dashboard"
    class="menu"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#409eff"
    router
  >
    <el-menu-item index="/admin/dashboard">
      仪表盘
    </el-menu-item>

    <el-menu-item index="/admin/user">
      用户管理
    </el-menu-item>

    <el-menu-item index="/admin/role">
      角色管理
    </el-menu-item>

    <el-menu-item index="/admin/menu">
      菜单管理
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
</script>

<style scoped>
.menu {
  height: 100%;
  border-right: none;
}
</style>