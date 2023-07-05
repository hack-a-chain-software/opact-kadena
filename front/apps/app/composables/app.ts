export const useAppShowLoader = () =>
  useState<boolean>('app-show-loader', () => true)
