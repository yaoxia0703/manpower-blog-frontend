import type { MenuType } from '../enums/menu'
import type { Status } from '../enums/status'

/**
 * メニュー情報
 */
export interface MenuItem {
  /**
   * メニューID
   */
  id: number

  /**
   * 親メニューID
   * 0 の場合はルートメニュー
   */
  parentId: number

  /**
   * メニュー名称
   */
  name: string

  /**
   * メニューパス
   */
  path: string

  /**
   * コンポーネントパス
   */
  component?: string

  /**
   * メニューアイコン
   */
  icon?: string

  /**
   * メニュー種別
   * DIRECTORY / MENU / BUTTON
   */
  type: MenuType

  /**
   * 表示順
   */
  sort?: number

  /**
   * メニュー状態
   * 0: 無効
   * 1: 有効
   */
  status?: Status

  /**
   * 権限コード
   */
  permission?: string

  /**
   * 子メニュー一覧
   */
  children?: MenuItem[]
}