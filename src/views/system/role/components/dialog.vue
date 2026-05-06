<template>
    <el-dialog v-model="visible" :title="isEdit ? '役割編集' : '役割新規追加'" width="500px" destroy-on-close>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @keyup.enter.prevent="handleSubmit">
            <!-- コード -->
            <el-form-item label="コード" prop="code">
                <el-input v-model="form.code" placeholder="コードを入力" :disabled="isEdit" />
            </el-form-item>

            <!-- 名前 -->
            <el-form-item label="名前" prop="name">
                <el-input v-model="form.name" placeholder="名前を入力" />
            </el-form-item>

            <!-- 状態 -->
            <el-form-item label="状態" prop="status">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
            </el-form-item>

            <!-- 順序 -->
            <el-form-item label="順序" prop="sort">
                <el-input-number v-model="form.sort" :min="1" class="input-number" />
            </el-form-item>
        </el-form>

        <!-- footer -->
        <template #footer>
            <el-button @click="handleCancel">キャンセル</el-button>
            <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
                確認
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { RoleVO } from '@/types/role/reoleResponse'
import { createRoleApi, updateRoleApi } from '@/api/system/role';

/**
 * =========================
 * Props
 * =========================
 */
const props = defineProps<{
    modelValue: boolean
    data?: RoleVO | null
}>()

/**
 * =========================
 * Emits
 * =========================
 */
const emit = defineEmits<{
    (e: 'update:modelValue', val: boolean): void
    (e: 'success'): void
}>()

/**
 * =========================
 * 状态
 * =========================
 */
const visible = ref(false)
const submitLoading = ref(false)
const isEdit = ref(false)

/**
 * =========================
 * 表单
 * =========================
 */
const formRef = ref<FormInstance>()

const form = reactive({
    id: undefined as number | undefined,
    code: '',
    name: '',
    status: 1,
    sort: 0
})

/**
 * =========================
 * 校验规则
 * =========================
 */
const rules: FormRules = {
    code: [
        { required: true, message: 'コードを入力してください', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '名前を入力してください', trigger: 'blur' }
    ]
}

/**
 * =========================
 * 监听 v-model
 * =========================
 */
watch(
    () => props.modelValue,
    (val) => {
        visible.value = val
        if (val) init()
    }
)

watch(visible, (val) => {
    emit('update:modelValue', val)
})

/**
 * =========================
 * 初始化
 * =========================
 */
function init() {
    if (props.data) {
        isEdit.value = true
        Object.assign(form, props.data)
    } else {
        isEdit.value = false
        resetForm()
    }
}

/**
 * =========================
 * 重置
 * =========================
 */
function resetForm() {
    form.id = undefined
    form.code = ''
    form.name = ''
    form.status = 1
    form.sort = 0
}

/**
 * =========================
 * 取消
 * =========================
 */
function handleCancel() {
    visible.value = false
}

/**
 * =========================
 * 提交
 * =========================
 */
function handleSubmit() {
    formRef.value?.validate(async (valid) => {
        if (!valid) return

        submitLoading.value = true
        try {
            let res

            if (isEdit.value) {
                res = await updateRoleApi(form.id!, form).then(res => res.data)
            } else {
                res = await createRoleApi(form).then(res => res.data)
            }

            if (res && res.code !== 200) {
                ElMessage.error(res.message)
                return
            }

            ElMessage.success('保存成功しました')
            emit('success')
            visible.value = false

        } catch (error: any) {
            console.error('リクエスト失敗:', error)
            ElMessage.error(error?.message || '通信エラーが発生しました')
        } finally {
            submitLoading.value = false
        }
    })
}
</script>


<style scoped>
.input-number {
    width: 120px;
}
</style>