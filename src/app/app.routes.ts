import { Routes } from '@angular/router';
import { LoginPageComponent } from './loginandregister/login.page.component';
import { RegisterPageComponent } from './loginandregister/register.page.component';
import { PageNotFoundComponent } from './error/page-not-found.component';
import { DashboardPageComponent } from './offer/dashboard.page.component';
import { AddOfferPageComponent } from './offer/add-offer.page.component';
import { FindOfferPageComponent } from './offer/find-offer.page.component';
import { authGuard } from './util/guards/auth.guard';

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
  {
    path: 'add',
    title: 'Add offer',
    component: AddOfferPageComponent,
  },
  {
    path: 'find',
    title: 'Find offer',
    component: FindOfferPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
