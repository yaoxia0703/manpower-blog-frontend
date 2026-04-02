import type { Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@/stores/permissionStore'

// 权限检查核心逻辑
// 支持：
// 1. string：单权限
// 2. string[]：多权限（默认 OR）
// 3. { value: string[], mode: 'and' | 'or' }：自定义模式
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const permissionStore = usePermissionStore()
  const value = binding.value

  if (!value) return

  let hasPermission = false

  // 1. 字符串
  if (typeof value === 'string') {
    hasPermission = permissionStore.hasPermission(value)
  }

  // 2. 数组（OR）
  else if (Array.isArray(value)) {
    hasPermission = value.some(p =>
      permissionStore.hasPermission(p)
    )
  }

  // 3. 对象（AND / OR）
  else if (typeof value === 'object') {
    const { value: perms, mode = 'or' } = value

    if (Array.isArray(perms)) {
      hasPermission =
        mode === 'and'
          ? perms.every(p => permissionStore.hasPermission(p))
          : perms.some(p => permissionStore.hasPermission(p))
    }
  }

  el.style.display = hasPermission ? '' : 'none'// 根据权限结果显示或隐藏元素
}

// 权限指令
export const permissionDirective: Directive = {// 在元素挂载和更新时检查权限
  mounted(el, binding) {
    checkPermission(el, binding)
  },

  updated(el, binding) {
    // ⭐ 避免无效重复计算
    if (binding.value === binding.oldValue) return
    checkPermission(el, binding)
  }
}