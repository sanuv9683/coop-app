import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn =async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.currentUser;
  console.log(user,"logged user");
  if (user) {
    return true;
  } else {
    // await router.navigate(['/auth/login']);
    return true;
  }
};
