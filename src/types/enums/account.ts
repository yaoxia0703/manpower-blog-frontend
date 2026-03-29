export const ACCOUNT_STATUS = {
  DISABLED: 0,
  ENABLED: 1,
} as const

export type AccountStatus = (typeof ACCOUNT_STATUS)[keyof typeof ACCOUNT_STATUS]

export const VERIFIED_STATUS = {
  UNVERIFIED: 0,
  VERIFIED: 1,
} as const

export type VerifiedStatus = (typeof VERIFIED_STATUS)[keyof typeof VERIFIED_STATUS]

export const ACCOUNT_TYPE = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
} as const

export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE]