import {Routes} from '@angular/router';
import {AuthGuard} from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    title: 'Products list',
    path: 'products',
    loadComponent: () => import('@pages/product-list/product-list').then(m => m.ProductList),
    canActivate: [AuthGuard]
  },
  {
    title: 'Product details',
    path: 'products/:uuid',
    loadComponent: () => import('@pages/product/product').then(m => m.Product),
    canActivate: [AuthGuard]
  },
  {
    title: 'Login',
    path: 'login',
    loadComponent: () => import('@pages/login/login').then(m => m.Login),
  },
  {
    title: "Register",
    path: 'register',
    loadComponent: () => import('@pages/register/register').then(m => m.Register),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];

