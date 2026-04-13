<template>
  <el-menu
    :default-active="route.path"
    class="menu"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#409eff"
    router
  >
    <!-- 固定首页 -->
    <el-menu-item index="/admin/dashboard">
      ダッシュボード
    </el-menu-item>

    <!-- 动态菜单 -->
    <template v-for="menu in menus" :key="menu.id">
      <MenuItem :menu="menu" />
    </template>

  </el-menu>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AdminSidebar'
})
import { usePermissionStore } from '@/stores/permissionStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'

const permissionStore = usePermissionStore()
const route = useRoute()

// 过滤掉按钮类型（type = 2）
const menus = computed(() =>
  permissionStore.menus.filter(menu => menu.type !== 2)
)
</script>

<style scoped>
.menu {
  height: 100%;
  border-right: none;
}
</style>