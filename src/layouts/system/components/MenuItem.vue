<template>
  <!-- ボタンタイプはメニューに表示しない -->
  <template v-if="!isButton">
    <!-- 子メニューなし -->
    <el-menu-item
      v-if="!hasChildren"
      :index="menu.path"
    >
      <el-icon v-if="menu.icon">
        <component :is="menu.icon" />
      </el-icon>

      <span>{{ menu.name }}</span>
    </el-menu-item>

    <!-- 子メニューあり -->
    <el-sub-menu
      v-else
      :index="menu.path || String(menu.id)"
    >
      <template #title>
        <el-icon v-if="menu.icon">
          <component :is="menu.icon" />
        </el-icon>

        <span>{{ menu.name }}</span>
      </template>

      <template
        v-for="child in visibleChildren"
        :key="child.id"
      >
        <MenuItem :menu="child" />
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
/**
 * サイドバーメニュー項目コンポーネント
 * 再帰構造でメニュー階層を表示する
 */
import { computed } from 'vue'
import type { MenuItem } from '@/types/system/menu'
import { MenuType } from '@/types/enums/menu'
import { ElIcon } from 'element-plus'

defineOptions({
  name: 'MenuItem',
})

const props = defineProps<{
  menu: MenuItem
}>()

/**
 * ボタンタイプかどうか
 * ボタンはサイドメニューに表示しない
 */
const isButton = computed(() => {
  return props.menu.type === MenuType.BUTTON
})

/**
 * ボタンタイプを除外した子メニュー一覧
 */
const visibleChildren = computed(() => {
  return (props.menu.children || []).filter(
    child => child.type !== MenuType.BUTTON,
  )
})

/**
 * 子メニューを持っているかどうか
 */
const hasChildren = computed(() => {
  return visibleChildren.value.length > 0
})
</script>