export const routes = [
  {
    to: '#',
    key: 'opact-wallet',
    label: 'Opact Wallet',
    subroutes: [
      {
        to: 'privacy',
        label: 'Privacy'
      },
      {
        to: 'security',
        label: 'Security'
      },
      {
        label: 'Documentation',
        to: 'documentation'
      }
    ]
  },
  {
    to: '#',
    key: 'opact-2wallet',
    label: 'Opact2 Wallet',
    subroutes: [
      {
        to: 'privacy',
        label: 'THECK'
      },
      {
        to: 'security',
        label: 'TCHECK'
      },
      {
        label: 'BLECK',
        to: 'documentation'
      }
    ]
  },
  {
    key: 'blog',
    label: 'Blog',
    to: '#'
  },
  {
    to: '#',
    key: 'contact',
    label: 'Contact'
  }
]

export default routes
