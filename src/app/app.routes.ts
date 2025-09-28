import {Routes} from '@angular/router';
import {AuthGuard} from '@core/guards';
import {ProductResolver} from '@features/products';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    title: 'Products list',
    path: 'products',
    loadComponent: () => import('@features/products').then(m => m.ProductListComponent),
    canActivate: [AuthGuard]
  },
  {
    title: 'ProductDetailComponent details',
    path: 'products/:uuid',
    loadComponent: () => import('@features/products').then(m => m.ProductDetailComponent),
    canActivate: [AuthGuard],
    resolve: {
      product: ProductResolver
    }
  },
  {
    title: 'LoginComponent',
    path: 'login',
    loadComponent: () => import('@app/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    title: "RegisterComponent",
    path: 'register',
    loadComponent: () => import('@app/pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];

