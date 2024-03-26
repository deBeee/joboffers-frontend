import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStateService } from '../user.state.service';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = inject(UserStateService).$loggedStateValue();
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
