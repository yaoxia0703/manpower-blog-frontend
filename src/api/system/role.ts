import http from '@/api/common/http'
import type { Result } from '@/types/common/result'
import type { RoleVO } from '@/types/role/reoleResponse'
import type { RoleSaveOrUpdateRequest } from '@/types/role/RoleSaveOrUpdateRequest'

/**
 * ロール一覧取得API
 * システムのロール一覧情報を取得する
 */
export function getRoleListApi() {
  return http.get<Result<RoleVO[]>>(
    '/api/system/role/list',
    { silent: true },
  )
}

/**
 * ロール新規作成API
 * 新しいロール情報を登録する
 */
export function createRoleApi(data: RoleSaveOrUpdateRequest) {
  return http.post<Result<number>>(
    '/api/system/role',
    data,
    { silent: true },
  )
}

/**
 * ロール詳細取得API
 * 指定されたロール情報を取得する
 */
export function detailRoleApi(id: number) {
  return http.get<Result<RoleVO>>(
    `/api/system/role/${id}`,
    { silent: true },
  )
}

/**
 * ロール更新API
 * 指定されたロール情報を更新する
 */
export function updateRoleApi(
  id: number,
  data: RoleSaveOrUpdateRequest,
) {
  return http.put<Result<void>>(
    `/api/system/role/${id}`,
    data,
    { silent: true },
  )
}

/**
 * ロール状態変更API
 * ロールの有効・無効状態を変更する
 */
export function changeRoleStatusApi(
  id: number,
  status: number,
) {
  return http.patch<Result<void>>(
    `/api/system/role/${id}/status`,
    { status },
    { silent: true },
  )
}

/**
 * ロール削除API
 * 指定されたロールを削除する
 */
export function deleteRoleApi(id: number) {
  return http.delete<Result<void>>(
    `/api/system/role/${id}`,
    { silent: true },
  )
}