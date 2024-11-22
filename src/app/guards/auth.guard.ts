import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (isAuthenticated) {
    const userType = user.Tipo_User;

    if (userType === 101) {
      if (state.url.startsWith('/adminview')) {
        router.navigate(['/tabs']);
        return false;
      }
    } else if (userType === 102) {
      if (
        state.url.startsWith('/tabs') ||
        state.url.startsWith('/tab') ||
        state.url.startsWith('/actividades') ||
        state.url.startsWith('/actividad-detalle-modal') ||
        state.url.startsWith('/cambiacomuna') ||
        state.url.startsWith('/historial')
      ) {
        router.navigate(['/adminview']);
        return false; 
      }
    }

    if (['/login', '/register', '/recover-pw'].includes(state.url)) {
      if (userType === 101) {
        router.navigate(['/tabs']);
      } else if (userType === 102) {
        router.navigate(['/adminview']);
      }
      return false;
    }
  } else {
    if (
      state.url.startsWith('/tabs') ||
      state.url.startsWith('/tab') ||
      state.url.startsWith('/actividades') ||
      state.url.startsWith('/actividad-detalle-modal') ||
      state.url.startsWith('/cambiacomuna') ||
      state.url.startsWith('/historial') ||
      state.url.startsWith('/adminview')
    ) {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};
