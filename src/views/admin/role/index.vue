<template>
  <el-card>
    <!-- 🔥 header 区 -->
    <template #header>
      <div class="card-header">
        <div>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" class="mb-8">
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbList"
              :key="item.path"
              :to="getBreadcrumbTo(item, index)"
            >
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 标题 -->
          <h2 class="page-title">役割一覧</h2>
        </div>

        <!-- 操作按钮 -->
        <el-button type="primary">新規追加</el-button>
      </div>
    </template>

    <!-- 🔍 搜索区 -->
    <div class="search-bar">
      <el-input
        v-model="search"
        placeholder="名前で検索"
        clearable
        style="width: 240px"
      />
    </div>

    <!-- 📊 表格 -->
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="日付" prop="date" width="180" />
      <el-table-column label="名前" prop="name" />

      <el-table-column label="操作" align="right" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            編集
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            削除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RoleIndex'
})

import { ref, computed } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'

/****************** 面包屑 ******************/
const { breadcrumbList, getBreadcrumbTo } = useBreadcrumb()

/****************** 表格 ******************/
const search = ref('')

const tableData = ref([
  { date: '2024-01-01', name: 'John Doe' },
  { date: '2024-02-01', name: 'Jane Smith' },
  { date: '2024-03-01', name: 'Alice Johnson' }
])

const filterTableData = computed(() => {
  return tableData.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function handleEdit(index: number, row: any) {
  console.log('Edit:', index, row)
}

function handleDelete(index: number, row: any) {
  console.log('Delete:', index, row)
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 600;
}

.mb-8 {
  margin-bottom: 8px;
}

.search-bar {
  margin-bottom: 16px;
}
</style>