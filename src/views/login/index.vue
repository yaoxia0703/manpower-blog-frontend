<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">Manpower Blog</h2>

      <el-form ref="formRef" :model="form" :rules="rules" class="login-form" @submit.prevent="handleLogin">
        <el-form-item prop="accountValue">
          <el-input v-model="form.accountValue" placeholder="メールアドレス" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="パスワード" show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" native-type="submit">
            ログイン
          </el-button>
          <div v-if="loginError" class="error-message">{{ loginError }}</div>
        </el-form-item>
      </el-form>

      <div class="footer">
        <a href="#">パスワードをお忘れですか？</a>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AdminLogin',// 组件名称
})
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { loginApi } from '@/api/auth/auth'
import { useRouter } from 'vue-router'
import { ACCOUNT_TYPE } from '@/types/enums/account'
import type { LoginRequest } from '@/types/auth/loginRequest'
import { useUserStore } from '@/stores/user'
import { resolveBizErrorMessage } from '@/utils/errorHandler'


const loginError = ref<string>('')

// 路由
const router = useRouter()
// 用户状态管理
const userStore = useUserStore()
// 表单数据
const form = reactive<LoginRequest>({
  accountType: ACCOUNT_TYPE.EMAIL, // 默认邮箱登录
  accountValue: '',
  password: '',
})


const formRef = ref<FormInstance>()

// 校验规则
const rules: FormRules = {
  accountValue: [
    { required: true, message: 'IDを入力してください', trigger: 'blur' },
    { min: 8, message: 'IDは8文字以上である必要があります', trigger: 'blur' },
    { max: 100, message: 'IDは100文字以内である必要があります', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'パスワードを入力してください', trigger: 'blur' },
    { min: 8, message: 'パスワードは8文字以上である必要があります', trigger: 'blur' },
    { max: 16, message: 'パスワードは16文字以内である必要があります', trigger: 'blur' },
  ],
}

// 登录
const handleLogin = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  try {
    const result = await loginApi(form)
    const resultData = result.data
    if (resultData.code===200) {
      // 登录成功，处理用户信息
      
      const data = resultData.data
      // 将用户信息和认证令牌保存到 Pinia
      userStore.setToken(data.accessToken)
      // 获取用户信息并保存到 Pinia
      await userStore.fetchUser()
      // console.log('用户信息已保存到 Pinia:', userStore.user)
      // console.log('Token 已保存到 Pinia:', userStore.token)

      await router.push('/system/dashboard')
      ElMessage.success('ログイン成功')// 显示登录成功消息
    } else {
      // 登录失败，显示错误信息
      console.error('登录失败: 无效的用户名或密码')
      loginError.value = '无効なユーザー名またはパスワード'
    }
  } catch (error: unknown) {
    console.error('登录失败:', error)
    loginError.value = resolveBizErrorMessage(error)
  }
}
</script>

<style scoped>
/* 背景（单张浅色图 + 渐变） */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image:
    linear-gradient(rgba(255, 255, 255, 0.45),
      rgba(255, 255, 255, 0.45)),
    url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e');

  background-size: cover;
  background-position: center;
}

/* 登录卡片（企业风） */
.login-card {
  width: 400px;
  padding: 30px;
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);

  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  transition: transform 0.2s ease;
}

/* 轻微 hover（高级感） */
.login-card:hover {
  transform: translateY(-2px);
}

/* 标题 */
.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* 按钮 */
.login-btn {
  width: 100%;
}

/* footer */
.footer {
  text-align: right;
  margin-top: 10px;
}

.footer a {
  color: #666;
  text-decoration: none;
}

/* 输入框 */
:deep(.el-input__wrapper) {
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: none;
}

:deep(.el-input__inner) {
  color: #333;
}

:deep(.el-input__inner::placeholder) {
  color: #999;
}

/* focus */
:deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
}

/* 按钮 */
:deep(.el-button--primary) {
  background: #409eff;
  border: none;
}

/* 表单项间距 */
:deep(.el-form-item) {
  margin-bottom: 28px;
}

:deep(.el-form-item__error) {
  min-height: 18px;
  line-height: 18px;
}

/* 错误提示 */
.error-message {
  margin-top: 12px;
  color: #f56c6c;
  font-size: 14px;
  text-align: left;


  line-height: 1.4;
}
</style>