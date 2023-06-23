export default defineAppConfig({
  title: 'On-chain Private And Compliant Transactions',
  subtitle: 'Opact Wallet allows you to perform anonymous transactions on the Blockchain by creating private accounts powered by Zero Knowledge.',
  nuxtIcon: {
    aliases: {
      eth: 'Eth',
      near: 'Near',
      menu: 'Menu',
      logo: 'Logo',
      arrow: 'Arrow',
      close: 'Close',
      github: 'Github',
      kadena: 'Kadena',
      twitter: 'Twitter',
      discord: 'Discord',
      opactLogo: 'OpactLogo'
    }
  },
  routes: [
    {
      to: 'privacy',
      title: 'Privacy'
    },
    {
      to: 'security',
      title: 'Security'
    },
    {
      title: 'Documentation',
      to: 'documentation'
    },
    {
      title: 'Contact',
      to: 'contact'
    }
  ],
  blockchains: [
    {
      icon: 'kadena',
      name: 'Kadena',
    },
    {
      icon: 'near',
      name: 'Near',
    },
    {
      icon: 'eth',
      name: 'Ethereum',
    },
  ],
  community: [
    {
      icon: 'github',
      title: 'Github',
      to: 'https://github.com/'
    },
    {
      icon: 'discord',
      title: 'Discord',
      to: 'https://discord.com/'
    },
    {
      icon: 'twitter',
      title: 'Twitter',
      to: 'https://twitter.com/'
    }
  ]
})
