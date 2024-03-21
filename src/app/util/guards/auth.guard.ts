import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../storage.service';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = inject(StorageService).$loggedStateValue();
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
