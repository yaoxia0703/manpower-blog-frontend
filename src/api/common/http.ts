import axios from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'
import { extractErrorMessage } from '@/utils/error'
import type { Result } from '@/types/common/result'
import router from '@/router'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
})

// 判断是否为 Result<T> 结构
function isResultShape(x: unknown): x is Result<unknown> {
  return (
    typeof x === 'object' &&
    x !== null &&
    'code' in x &&
    typeof (x as Result<unknown>).code === 'number'
  )
}

// 是否需要跳转错误页
function shouldRedirect(code?: number): boolean {
  if (!code) return false
  return [403, 404, 500, 502, 503].includes(code)
}

// 是否为静默模式（不提示错误）
function isSilent(config?: { silent?: boolean }): boolean {
  return config?.silent === true
}

/* 请求拦截器 */
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

/* 响应拦截器 */
http.interceptors.response.use(
  (res: AxiosResponse) => {
    const data = res.data as unknown
    const silent = isSilent(res.config)

    // 业务错误处理（Result<T>）
    if (isResultShape(data) && data.code !== 200) {
      if (shouldRedirect(data.code)) {
        router.replace({
          name: 'ErrorPage',
          state: {
            code: String(data.code),
            message: data.message,
          },
        })
      } else if (!silent) {
        let msg = data.message

        // 优先解析字段错误（errors / items）
        const items =
          (data as any)?.data?.items ||
          (data as any)?.data?.errors

        if (Array.isArray(items) && items.length > 0) {
          msg = items[0].message || items[0].key || msg
        }

        ElMessage.error(msg ?? '发生错误')
      }

      return Promise.reject({
        ...data,
        __isBizError: true,
      })
    }

    return res
  },

  (error: AxiosError) => {
    const status = error.response?.status
    const silent = isSilent(error.config)

    // 未认证处理（401）
    if (status === 401) {
      sessionStorage.clear()
      router.replace('/login')
      return Promise.reject(error)
    }

    // 需要跳转错误页的状态码
    if (shouldRedirect(status)) {
      const body = error.response?.data as any

      const code =
        typeof body?.code === 'number'
          ? body.code
          : status ?? 500

      const message =
        typeof body?.message === 'string'
          ? body.message
          : undefined

      router.replace({
        name: 'ErrorPage',
        state: {
          code: String(code),
          message,
        },
      })

      return Promise.reject(error)
    }

    // 统一错误提示入口
    if (!silent) {
      const extracted = extractErrorMessage(error)

      ElMessage.error(
        typeof extracted === 'string' && extracted.trim()
          ? extracted
          : '网络异常，请稍后重试',
      )
    }

    return Promise.reject(error)
  },
)

export default http