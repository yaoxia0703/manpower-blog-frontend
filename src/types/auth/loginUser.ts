import type { UserStatus } from '@/types/enums/user'
import type { AccountStatus, AccountType, VerifiedStatus } from '@/types/enums/account'


// 定义登录用户信息接口
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
//
export interface LoginResponse {
  accessToken: string
  user: LoginUser
}