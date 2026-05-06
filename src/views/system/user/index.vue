<template>

  <el-card>
    <!-- 🔥 header 区 -->
    <template #header>
      <div class="card-header">
        <div>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" class="mb-8">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path"
              :to="getBreadcrumbTo(item, index)">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 标题 -->
          <h2 class="page-title">ユーザー一覧</h2>
        </div>

        <!-- 操作按钮 -->
        <el-button type="primary" @click="handleAdd">新規追加</el-button>
      </div>
    </template>

    <!-- 🔍 搜索区 -->
    <!-- <div class="search-bar">
      <el-input v-model="search" placeholder="名前で検索" clearable style="width: 240px" />
    </div> -->

    <!-- 📊 表格 -->
    <el-table :data="filteredTableData" v-loading="tableLoading" style="width: 100%">
      <el-table-column label="コード" prop="code" width="280" />
      <el-table-column label="名前" prop="name" />
      <!-- <el-table-column label="状態" width="120">
        <template #default="scope">
          <el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0" :loading="scope.row._loading"
            @change="(val: number) => handleStatusChange(scope.row, val)" />
        </template>
      </el-table-column> -->
      <el-table-column label="作成日時" prop="createdAt" width="220" />
      <el-table-column label="更新日時" prop="updatedAt" width="220" />

      <!-- <el-table-column label="操作" align="right" width="380">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            編集
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            削除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UserIndex'
})

import { ref, computed } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
// import { onMounted } from 'vue'
// import { ElMessageBox, ElMessage } from 'element-plus'


/****************** パンくずリスト ******************/
const { breadcrumbList, getBreadcrumbTo } = useBreadcrumb()



/****************** テーブル管理 ******************/
const tableData = ref([])
const tableLoading = ref(false)
const filteredTableData = computed(() => {
  
})

/****************** ダイアログ操作 ******************/
function handleAdd() {
  // 新規追加の処理
  console.log('新規追加')
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