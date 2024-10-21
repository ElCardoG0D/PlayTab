import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (isAuthenticated) {
    if (['/login', '/register'].includes(state.url)) {
      router.navigate(['/tabs']);
      return false;
    }
  } else {
    if (state.url.startsWith('/tabs')) {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};
