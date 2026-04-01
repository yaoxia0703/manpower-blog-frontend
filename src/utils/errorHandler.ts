// utils/errorHandler.ts
export function resolveBizErrorMessage(error: unknown): string {
  const err = error as any

  if (err.__isBizError) {
    const errors = err.data?.errors

    if (Array.isArray(errors) && errors.length > 0) {
      return errors[0].key
    }

    return err.message || 'エラーが発生しました'
  }

  return 'システムエラーが発生しました'
}