import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
//import { customInterceptor } from './service/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes, withComponentInputBinding())],
};
