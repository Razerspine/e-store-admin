import {Routes} from '@angular/router';
import {AuthGuard} from '@core/guards';
import {ProductResolver} from '@features/products';
import {UserResolver} from '@features/users';

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
    title: 'Product detail',
    path: 'products/:uuid',
    loadComponent: () => import('@features/products').then(m => m.ProductDetailComponent),
    canActivate: [AuthGuard],
    resolve: {
      product: ProductResolver
    }
  },
  {
    title: 'User List',
    path: 'users',
    loadComponent: () => import('@features/users').then(m => m.UserListComponent),
    canActivate: [AuthGuard]
  },
  {
    title: 'User detail',
    path: 'users/:userId',
    loadComponent: () => import('@features/users').then(m => m.UserDetailComponent),
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
    }
  },
  {
    title: 'Login',
    path: 'login',
    loadComponent: () => import('@app/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    title: "Register",
    path: 'register',
    loadComponent: () => import('@app/pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];

