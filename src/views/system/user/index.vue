<template>
  <el-card>
    <!-- ヘッダー -->
    <template #header>
      <div class="card-header">
        <div>
          <!-- パンくずリスト -->
          <el-breadcrumb separator="/" class="mb-8">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path"
              :to="getBreadcrumbTo(item, index)">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>

          <!-- タイトル -->
          <h2 class="page-title">
            ユーザー一覧
          </h2>
        </div>

        <!-- 操作ボタン -->
        <el-button type="primary" @click="handleAdd">
          新規追加
        </el-button>
      </div>
    </template>

    <!-- 検索エリア -->
    <!--
    <div class="search-bar">
      <el-input
        v-model="search"
        placeholder="名前で検索"
        clearable
        style="width: 240px"
      />
    </div>
    -->

    <!-- 一覧テーブル -->
    <el-table :data="filteredTableData" v-loading="tableLoading" style="width: 100%">
      <el-table-column label="コード" prop="code" width="280" />

      <el-table-column label="名前" prop="name" />

      <!--
      <el-table-column
        label="状態"
        width="120"
      >
        <template #default="scope">
          <el-switch
            :model-value="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            :loading="scope.row._loading"
            @change="(val: number) => handleStatusChange(scope.row, val)"
          />
        </template>
      </el-table-column>
      -->

      <el-table-column label="作成日時" prop="createdAt" width="220" />

      <el-table-column label="更新日時" prop="updatedAt" width="220" />

      <!--
      <el-table-column
        label="操作"
        align="right"
        width="380"
      >
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.row)"
          >
            編集
          </el-button>

          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            削除
          </el-button>
        </template>
      </el-table-column>
      -->
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UserIndex',
})

import {
  computed,
  ref,
} from 'vue'

import { useBreadcrumb } from '@/composables/useBreadcrumb'

// import { onMounted } from 'vue'
// import {
//   ElMessage,
//   ElMessageBox,
// } from 'element-plus'

/****************** パンくずリスト ******************/
const {
  breadcrumbList,
  getBreadcrumbTo,
} = useBreadcrumb()

/****************** テーブル管理 ******************/
// const tableData = ref([])

const tableLoading = ref(false)

/**
 * フィルター後テーブルデータ
 */
const filteredTableData = computed(() => {
  return []
})

/****************** ダイアログ操作 ******************/

/**
 * 新規追加処理
 */
function handleAdd() {
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