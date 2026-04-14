import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permissionStore'
import { MenuType } from '@/types/enums/menu'

export function useBreadcrumb() {
  const route = useRoute()
  const permissionStore = usePermissionStore()

  const breadcrumbList = computed(() => {
    return permissionStore.findMenuPath(route.path)
  })

  function getBreadcrumbTo(item: any, index: number) {
    const isLast = index === breadcrumbList.value.length - 1

    if (isLast) return undefined
    if (item.type === MenuType.DIRECTORY) return undefined

    return item.path
  }

  return {
    breadcrumbList,
    getBreadcrumbTo
  }
}