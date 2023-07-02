export type RouteType = 'widget' | 'link' | 'subroute';

export type RouteWidget = 'blog' | 'subroutes';

export interface BaseRoute {
  to: string;
  key: string;
  label: string;
}

export interface LinkRoute extends BaseRoute {
  type: 'link';
}

export interface WidgetRoute extends BaseRoute {
  type: 'widget';
  width: number;
  order: number;
  height: number;
  widget: RouteWidget;
}

export interface Subroute extends WidgetRoute {
  subroutes: BaseRoute[];
}

export type Route = WidgetRoute | LinkRoute | Subroute;

export const routes: Route[] = [
  {
    order: 1,
    width: 355,
    height: 57,
    to: '/wallet',
    type: 'widget',
    widget: 'subroutes',
    label: 'Opact Wallet',
    key: 'route:widget:Subroutes:opact-wallet',
    subroutes: [
      {
        key: 'zk-tools-Privacy-zk',
        to: 'https://tinyman.org/',
        label: 'Privacy'
      },
      {
        key: 'zk-tools-Documentation-zk',
        label: 'Documentation',
        to: 'https://tinyman.org/'
      },
      {
        key: 'zk-tools-Security-zk',
        to: 'https://tinyman.org/',
        label: 'Security'
      }
    ]
  },
  {
    order: 2,
    width: 800,
    height: 260,
    label: 'Blog',
    type: 'widget',
    widget: 'blog',
    key: 'menu:widget:blog',
    to: 'https://tinyman.org/'
  },
  {
    order: 3,
    width: 300,
    height: 57,
    type: 'widget',
    label: 'ZK Tools',
    widget: 'subroutes',
    to: 'https://tinyman.org/',
    key: 'route:widget:subroutes:zk-tools',
    subroutes: [
      {
        key: 'zk-tools-subroute-zk',
        to: 'https://tinyman.org/',
        label: 'ZK Tool'
      },
      {
        key: 'zk-tools-subroute-happy',
        to: 'https://tinyman.org/',
        label: 'Happy'
      },
      {
        key: 'zk-tools-subroute-link',
        label: 'How Works',
        to: 'https://tinyman.org/'
      }
    ]
  },
  {
    type: 'link',
    key: 'contact',
    label: 'Contact',
    to: 'https://tinyman.org/'
  }
]

export default routes
