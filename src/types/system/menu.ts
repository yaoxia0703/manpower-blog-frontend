// 定义菜单项接口
export interface MenuItem {
  id: number // 菜单 ID
  parentId: number // 父菜单 ID，0 表示顶级菜单
  name: string // 菜单名称
  path: string// 菜单路径
  component?: string// 菜单组件路径
  icon?: string// 菜单图标
  type: number// 菜单类型，0 表示目录，1 表示菜单，2 表示按钮
  sort?: number// 菜单排序
  status?: number// 菜单状态，0 表示禁用，1 表示启用

  permission?: string // 权限标识符
  children?: MenuItem[]// 子菜单项
}