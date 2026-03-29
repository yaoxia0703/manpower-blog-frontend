import http from '@/api/common/http'
import type { Result } from '@/types/common/result'
import type { LoginUser } from '@/types/auth/loginUser'
import type { LoginRequest } from '@/types/auth/loginRequest'

export function loginApi(loginRequest: LoginRequest) {
  return http.post<Result<LoginUser>>(
    "/api/system/auth/login",
    loginRequest
  )
}