import {MenuItem} from 'primeng/api';

export const MENU_CONFIG: MenuItem[] = [
  {
    label: 'Menu',
    items: [
      {
        label: 'Products',
        routerLink: '/products'
      },
      {
        label: 'Users',
        routerLink: '/users'
      }
    ]
  }
]
