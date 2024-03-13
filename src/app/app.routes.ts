import { Routes } from '@angular/router';
import { LoginPageComponent } from './loginandregister/login.page.component';
import { RegisterPageComponent } from './register.page.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginPageComponent,
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: DashboardComponent,
  //       //canActivate: [authGuard],
  //     },
  //   ],
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
