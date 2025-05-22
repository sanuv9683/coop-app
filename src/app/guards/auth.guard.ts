import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject }                          from '@angular/core';
import { Auth,authState }                 from '@angular/fire/auth';
import { first, map }                      from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    first(),
    map(user => {
      if (user) {
        return true;
      }
      // not signed in → redirect to login, with returnUrl
      return router.createUrlTree(
        ['/auth/login'],
        { queryParams: { returnUrl: state.url } }
      );
    })
  );
};
