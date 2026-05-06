// utils/errorHandler.ts

/**
 * 業務例外メッセージ解析処理
 * 業務例外から表示用メッセージを取得する
 */
export function resolveBizErrorMessage(
  error: unknown,
): string {
  const err = error as any

  /**
   * 業務例外判定
   */
  if (err.__isBizError) {
    const errors = err.data?.errors

    /**
     * フィールドバリデーションエラー優先
     */
    if (
      Array.isArray(errors) &&
      errors.length > 0
    ) {
      return errors[0].key
    }

    return (
      err.message ||
      'エラーが発生しました'
    )
  }

  /**
   * システム例外
   */
  return 'システムエラーが発生しました'
}