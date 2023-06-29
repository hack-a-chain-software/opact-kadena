export const routes = [
  {
    to: '#',
    key: 'opact-wallet',
    label: 'Opact Wallet',
    width: 355,
    height: 57,
    order: 1,
    subroutes: [
      {
        to: '#',
        label: 'Privacy'
      },
      {
        to: '#',
        label: 'Security'
      },
      {
        label: 'Documentation',
        to: '#'
      }
    ]
  },
  {
    to: '#',
    key: 'opact232i4932wallet',
    label: 'Blog',
    width: 800,
    height: 260,
    order: 2,
    component: 'blogMenu'
  },
  {
    to: '#',
    key: 'opact2-1312321432',
    label: 'ZK Tools',
    width: 300,
    height: 57,
    order: 3,
    subroutes: [
      {
        to: '#',
        label: 'ZK Tool'
      },
      {
        to: '#',
        label: 'Happy'
      },
      {
        label: 'How Works',
        to: '#'
      }
    ]
  },
  {
    to: '#',
    key: 'contact',
    label: 'Contact'
  }
]

export default routes
