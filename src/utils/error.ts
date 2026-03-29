import type { AxiosError } from 'axios'

export function extractErrorMessage(
  err: unknown,
  fallback = 'エラーが発生しました',
): string {

  // 业务异常处理
  if (
    typeof err === 'object' &&
    err !== null &&
    'isBusinessError' in err
  ) {
    return (err as { message?: string }).message || fallback
  }

  // AxiosError处理
  if (isAxiosError(err)) {
    const axiosErr = err as AxiosError<any>
    const res = axiosErr.response?.data

    // 1. 字段校验错误（优先）
    const errors = res?.data?.errors
    if (Array.isArray(errors) && errors.length > 0) {
      return errors[0].key || errors[0].message || fallback
    }

    // 2. 兼容旧结构 items
    const items = res?.data?.items
    if (Array.isArray(items) && items.length > 0) {
      return items[0].message || fallback
    }

    // 3. detail 信息
    if (res?.detail) {
      return res.detail
    }

    // 4. 通用 message
    if (res?.message) {
      return res.message
    }

    // 5. HTTP 状态码兜底
    const status = axiosErr.response?.status
    if (status) {
      switch (status) {
        case 400:
          return 'リクエストが不正です (400)'
        case 401:
          return '認証が必要です (401)'
        case 403:
          return '権限がありません (403)'
        case 404:
          return 'リソースが見つかりません (404)'
        case 500:
          return 'サーバー内部エラー (500)'
        case 502:
        case 503:
        case 504:
          return 'サーバーが一時的に利用できません'
      }
    }

    return axiosErr.message || fallback
  }

  // 原生错误
  if (err instanceof Error) {
    return err.message
  }

  return fallback
}

// 判断是否为AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error
  )
}