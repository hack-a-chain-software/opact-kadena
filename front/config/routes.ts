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
    width: 300,
    height: 57,
    to: '/wallet',
    type: 'widget',
    widget: 'subroutes',
    label: 'Products',
    key: 'route:widget:Subroutes:opact-wallet',
    subroutes: [
      {
        key: 'wallet:privacy:link',
        to: '/wallet',
        label: 'Opact Wallet'
      },
      {
        key: 'wallet:documentation:link',
        label: 'Opact Tickets',
        to: '/tickets'
      }
    ]
  },
  {
    order: 2,
    width: 868,
    height: 317,
    label: 'Blog',
    type: 'widget',
    widget: 'blog',
    key: 'menu:widget:blog',
    to: 'https://opact.ghost.io/'
  },
  {
    type: 'link',
    key: 'contact',
    label: 'Contact',
    to: '#contact'
  }
]

export default routes
