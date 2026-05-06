import http from '@/api/common/http'
import type { Result } from '@/types/common/result'
import type { MenuItem } from '@/types/system/menu'

/**
 * メニュー一覧取得API
 * システムのメニュー情報一覧を取得する
 */
export function getMenuListApi() {
  return http.get<Result<MenuItem[]>>('/api/system/menu/list')
}