<template>
  <!-- 按钮类型不显示 -->
  <template v-if="!isButton">
    <!-- 没有子菜单 -->
    <el-menu-item v-if="!hasChildren" :index="menu.path">
      <el-icon v-if="menu.icon">
        <component :is="menu.icon" />
      </el-icon>
      <span>{{ menu.name }}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-sub-menu v-else :index="menu.path || String(menu.id)">
      <template #title>
        <el-icon v-if="menu.icon">
          <component :is="menu.icon" />
        </el-icon>
        <span>{{ menu.name }}</span>
      </template>

      <template v-for="child in visibleChildren" :key="child.id">
        <MenuItem :menu="child" />
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MenuItem } from '@/types/system/menu'
import { MenuType } from '@/types/enums/menu'
import { ElIcon } from 'element-plus';

defineOptions({
  name: 'MenuItem'
})

const props = defineProps<{
  menu: MenuItem
}>()

/**
 * 是否是按钮（不显示在菜单）
 */
const isButton = computed(() => props.menu.type === MenuType.BUTTON)

/**
 * 过滤掉按钮类型子菜单
 */
const visibleChildren = computed(() => {
  return (props.menu.children || []).filter(
    child => child.type !== MenuType.BUTTON
  )
})

/**
 * 是否有子菜单
 */
const hasChildren = computed(() => {
  return visibleChildren.value.length > 0
})
</script>