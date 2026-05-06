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
          <h2 class="page-title">役割一覧</h2>
        </div>

        <!-- 操作按钮 -->
        <el-button type="primary" @click="handleAdd">新規追加</el-button>
      </div>
    </template>

    <!-- 🔍 搜索区 -->
    <div class="search-bar">
      <el-input v-model="search" placeholder="名前で検索" clearable style="width: 240px" />
    </div>

    <!-- 📊 表格 -->
    <el-table :data="filterTableData" v-loading="tableLoading" style="width: 100%">
      <el-table-column label="コード" prop="code" width="280" />
      <el-table-column label="名前" prop="name" />
      <el-table-column label="状態" width="120">
        <template #default="scope">
          <el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0" :loading="scope.row._loading"
            @change="(val: number) => handleStatusChange(scope.row, val)" />
        </template>
      </el-table-column>
      <el-table-column label="作成日時" prop="createdAt" width="220" />
      <el-table-column label="更新日時" prop="updatedAt" width="220" />

      <el-table-column label="操作" align="right" width="380">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            編集
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">
            削除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <RoleDialog v-model="dialogVisible" :data="dialogData" @success="loadData" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'RoleIndex'
})

import { ref, computed } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import type { RoleVO, RoleView } from '@/types/role/reoleResponse'
import { getRoleListApi, detailRoleApi, changeRoleStatusApi, deleteRoleApi } from '@/api/system/role'
import { onMounted } from 'vue'
import RoleDialog from './components/dialog.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Status } from '@/types/enums/status'




/****************** パンくずリスト ******************/
const { breadcrumbList, getBreadcrumbTo } = useBreadcrumb()

/****************** テーブル ******************/
const search = ref('')
const tableLoading = ref(false)

const tableData = ref<RoleView[]>([])

const filterTableData = computed(() => {
  const kw = search.value.trim().toLowerCase()
  return tableData.value.filter(item =>
    (item.name || '').toLowerCase().includes(kw)
  )
})

/****************** ダイアログ操作 ******************/
const dialogVisible = ref(false)
const dialogData = ref<RoleVO | null>(null)

// 新規追加ダイアログを開く
function handleAdd() {
  dialogData.value = null
  dialogVisible.value = true
}

// 編集ダイアログを開く
async function handleEdit(row: RoleView) {
  try {
    const res = await detailRoleApi(row.id).then(res => res.data)

    if (res.code === 200) {
      dialogData.value = { ...res.data }
      dialogVisible.value = true
    } else {
      console.error('Failed to fetch role details:', res.message)
      ElMessage.error('データの取得に失敗しました')
    }
  } catch (error) {
    console.error('Failed to fetch role details:', error)
    ElMessage.error('データの取得に失敗しました')
  }
}

// 削除ダイアログを開く
async function handleDelete(row: RoleView) {
  try {
    await ElMessageBox.confirm(
      `役割「${row.name}」を削除しますか？`,
      '確認',
      {
        confirmButtonText: '確認',
        cancelButtonText: 'キャンセル',
        type: 'warning'
      }
    )
    const res = await deleteRoleApi(row.id).then(res => res.data)
    if (res.code !== 200) {
      ElMessage.error(res.message)
      return
    }
    ElMessage.success('削除に成功しました')
    loadData()
  } catch (err: any) {
    if (err === 'cancel' || err === 'close') {
      ElMessage.info('操作をキャンセルしました')
    } else {
      ElMessage.error('削除に失敗しました')
    }
  }

}

// 状態変更
async function handleStatusChange(row: RoleView, newStatus: number) {
  if (row._loading) return

  const oldStatus = row.status

  try {
    await ElMessageBox.confirm(
      `状態を「${newStatus === 1 ? '有効' : '無効'}」に変更しますか？`,
      '確認',
      {
        confirmButtonText: '確認',
        cancelButtonText: 'キャンセル',
        type: 'warning'
      }
    )

    row._loading = true

    const targetStatus =
      newStatus === 1 ? Status.ENABLED : Status.DISABLED

    const res = await changeRoleStatusApi(row.id, targetStatus).then(res => res.data)

    if (res.code !== 200) {
      row.status = oldStatus
      ElMessage.error(res.message)
      return
    }

    row.status = targetStatus
    ElMessage.success('更新に成功しました')
  } catch (err: any) {
    if (err === 'cancel' || err === 'close') {
      ElMessage.info('操作をキャンセルしました')
    } else {
      row.status = oldStatus
      ElMessage.error('更新に失敗しました')
    }
  } finally {
    row._loading = false
  }
}

/****************** データ読み込み ******************/
async function loadData() {
  tableLoading.value = true
  try {
    const res = await getRoleListApi().then(res => res.data)

    if (res.code === 200) {
      tableData.value = (res.data || []).map((item: RoleVO) => ({
        ...item,
        _loading: false
      }))
    } else {
      console.error('Failed to load role data:', res.message)
    }
  } catch (error) {
    console.error('Failed to load role data:', error)
  } finally {
    tableLoading.value = false
  }
}
// ページ読み込み時にデータを取得
onMounted(() => {
  loadData()
})
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