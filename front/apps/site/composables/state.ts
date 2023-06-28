export const useCurrentDropdown = () =>
  useState<string>('current-dropdown', () => '')

export const useMobileMenu = () =>
  useState<boolean>('mobile-menu', () => false)
export const useMenuDropdown = () =>
  useState<boolean>('menu-dropdown', () => false)
export const useFixedNavbar = () =>
  useState<boolean>('show-fixed-navbar', () => false)

export const toggleMenuDropdown = () => {
  const state = useMenuDropdown()
  const current = useCurrentDropdown()

  state.value = !state.value
  current.value = ''
}
