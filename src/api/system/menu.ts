import http from "@/api/common/http"
import type { Result } from "@/types/common/result"
import type { MenuItem } from "@/types/system/menu"
// 获取菜单列表
export function getMenuListApi() {
  return http.get<Result<MenuItem[]>>("/api/system/menu/list")
}