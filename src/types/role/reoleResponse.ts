import type { Status } from "../enums/status"

export interface RoleVO {
  id: number
  code: string
  name: string
  status: Status
  sort: number
}

export interface RoleView extends RoleVO {
  _loading: boolean
}