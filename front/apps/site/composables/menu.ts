export const useCurrentMenu = () =>
  useState<any>('current-menu', () => null)

export const useShowFixedHeader = () =>
  useState<boolean>('show-fixed-navbar', () => false)

export const useShowMenu = () =>
  useState<boolean>('menu-dropdown', () => false)

export const handleMenuState = (
  newMenu: any = null,
  flag: any = false
) => {
  const show = useShowMenu()
  const current = useCurrentMenu()

  show.value = flag
  current.value = newMenu
}
