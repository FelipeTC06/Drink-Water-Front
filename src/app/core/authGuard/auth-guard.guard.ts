import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../signals/auth-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  const currentUser = authStateService.currentUserSig();

  if (currentUser && currentUser.id) {
    const userID = currentUser.id;
    const routeUserId = Number(route.paramMap.get('id')); // Convert to number

    if (userID === routeUserId) {
      return true;
    }
  }
  
  router.navigate(['/login']);
  return false;
};
