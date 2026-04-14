export const MenuType = {
  DIRECTORY: 1,
  MENU: 2,
  BUTTON: 3
} as const

export type MenuType = typeof MenuType[keyof typeof MenuType]