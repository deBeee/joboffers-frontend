import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../storage.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);

  if (
    req.url === 'http://localhost:8080/token' ||
    req.url === 'http://localhost:8080/register'
  ) {
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
