export const tokens = [
  {
    id: '0',
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA',
    namespace: {
      id: '',
      refName: {
        name: 'coin',
        namespace: ''
      },
      refSpec: {
        name: 'fungible-v2',
        namespace: ''
      }
    }
  },
  {
    id: '0',
    icon: '/kdx.png',
    name: 'Kaddex',
    symbol: 'KDX',
    namespace: {
      id: '',
      refName: {
        name: 'opact-coin',
        namespace: 'test'
      },
      refSpec: {
        name: 'fungible-v2',
        namespace: ''
      }
    }
  }
]

export const moneyConfig = {
  prefix: '',
  suffix: '',
  decimal: '.',
  thousands: '',

  precision: 1,
  masked: false,
  shouldRound: true,
  allowBlank: true,
  focusOnRight: false,
  disableNegative: true,

  minimumNumberOfCharacters: 0
}

export const nftAccounts = []

export const tokenAccounts = []

export const baseUrl =
process.env.NODE_ENV === 'development'
  ? 'localhost:3000'
  : window.location.origin
