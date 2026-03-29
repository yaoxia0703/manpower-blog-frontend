import type { UserStatus } from '@/types/enums/user'
import type { AccountStatus, AccountType, VerifiedStatus } from '@/types/enums/account'


export interface LoginUser {
  userId: number
  accountId: number
  nickName: string
  accountType: AccountType
  accountValue: string
  userStatus: UserStatus
  accountStatus: AccountStatus
  verified: VerifiedStatus
  
}

export interface AuthInfo {
  token: string
}