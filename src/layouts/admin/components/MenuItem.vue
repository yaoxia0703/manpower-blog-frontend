<template>
  <!-- 按钮类型不显示 -->
  <template v-if="!isButton">
    <!-- 没有子菜单 -->
    <el-menu-item v-if="!hasChildren" :index="menu.path">
      <span>{{ menu.name }}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-sub-menu v-else :index="menu.path || String(menu.id)">
      <template #title>
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

defineOptions({
  name: 'MenuItem'
})

const props = defineProps<{
  menu: MenuItem
}>()

/**
 * 是否是按钮（不显示在菜单）
 * 0 = 目录
 * 1 = 菜单
 * 2 = 按钮
 */
const isButton = computed(() => props.menu.type === 2)

/**
 * 过滤掉按钮类型子菜单
 */
const visibleChildren = computed(() => {
  return (props.menu.children || []).filter(child => child.type !== 2)
})

/**
 * 是否有子菜单
 */
const hasChildren = computed(() => {
  return visibleChildren.value.length > 0
})
</script>