// src/types/common/result.ts
export interface Result<T> {
  code: number
  message: string
  data: T
}