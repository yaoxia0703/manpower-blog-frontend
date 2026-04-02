import http from '@/api/common/http'
import type { Result } from '@/types/common/result'
import type { LoginResponse, LoginUser, MeResponse } from '@/types/auth/loginUser'
import type { LoginRequest } from '@/types/auth/loginRequest'

export function loginApi(loginRequest: LoginRequest) {
  return http.post<Result<LoginResponse>>(
    "/api/system/auth/login",
    loginRequest,
    { silent: true }
  )
}

export function logoutApi() {
  return http.post<Result<null>>(
    "/api/system/auth/logout",
    {},
    { silent: true }
  )
}

export function getMeApi() {
  return http.get<Result<MeResponse>>(
    "/api/system/auth/me",
    { silent: true }
  )
}