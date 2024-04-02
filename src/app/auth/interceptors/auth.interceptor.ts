import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStateService } from '../user.state.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(UserStateService);

  if (req.url === '/api/token' || req.url === '/api/register') {
    return next(req);
  }

  const token = storageService.getToken();

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedRequest);
};
