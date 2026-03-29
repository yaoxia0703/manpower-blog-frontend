export const USER_STATUS = {
  DISABLED: 0,
  ENABLED: 1,
} as const

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS]