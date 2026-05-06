export const Status = {// 状态枚举 只负责有效与无效的状态
  DISABLED: 0,
  ENABLED: 1
} as const

export type Status = typeof Status[keyof typeof Status] 