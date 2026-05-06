import http from "@/api/common/http"
import type { Result } from "@/types/common/result"
import type { RoleVO } from '@/types/role/reoleResponse'
import type { RoleSaveOrUpdateRequest } from "@/types/role/RoleSaveOrUpdateRequest"

/**
 * 角色列表查询
 */
export function getRoleListApi() {
  return http.get<Result<RoleVO[]>>("/api/system/role/list", { silent: true })
}

export function createRoleApi(data: RoleSaveOrUpdateRequest) {
  return http.post<Result<number>>('/api/system/role',
    data,
    { silent: true })
}

export function detailRoleApi(id: number) {
  return http.get<Result<RoleVO>>(`/api/system/role/${id}`, { silent: true })
}

export function updateRoleApi(id: number, data: RoleSaveOrUpdateRequest) {
  return http.put<Result<void>>(`/api/system/role/${id}`,
    data,
    { silent: true })
}

export function changeRoleStatusApi(id: number, status: number) {
  return http.patch<Result<void>>(`/api/system/role/${id}/status`,
    { status },
    { silent: true })
}

export function deleteRoleApi(id: number) {
  return http.delete<Result<void>>(`/api/system/role/${id}`, { silent: true })
}