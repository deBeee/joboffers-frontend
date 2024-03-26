import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login.page.component';
import { RegisterPageComponent } from './auth/register.page.component';
import { PageNotFoundComponent } from './layout/page-not-found.component';
import { DashboardPageComponent } from './offer/dashboard.page.component';
import { AddOfferPageComponent } from './offer/add-offer.page.component';
import { FindOfferPageComponent } from './offer/find-offer.page.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
  {
    path: 'add',
    title: 'Add offer',
    component: AddOfferPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'find',
    title: 'Find offer',
    component: FindOfferPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
