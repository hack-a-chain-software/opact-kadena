export default defineAppConfig({
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
