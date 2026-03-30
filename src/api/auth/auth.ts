import http from '@/api/common/http'
import type { Result } from '@/types/common/result'
import type { LoginResponse } from '@/types/auth/loginUser'
import type { LoginRequest } from '@/types/auth/loginRequest'

export function loginApi(loginRequest: LoginRequest) {
  return http.post<Result<LoginResponse>>(
    "/api/system/auth/login",
    loginRequest
  )
}