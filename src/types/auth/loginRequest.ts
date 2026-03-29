import type { AccountType } from '@/types/enums/account'

export interface LoginRequest {
    accountType: AccountType
    accountValue: string
    password: string
}