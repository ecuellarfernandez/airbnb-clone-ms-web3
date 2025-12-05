import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Guard que protege rutas que requieren que el usuario sea un HOST.
 * Verifica:
 * 1. Que el usuario esté autenticado
 * 2. Que tenga el rol de HOST
 * Si no cumple, redirige al usuario a home con mensaje de error.
 */
export const hostGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = authService.getToken();

  // Si no hay token, redirigir al login
  if (!token) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  return authService.getCurrentUser().pipe(
    map(response => {
      if (response.success && response.data) {
        const user = response.data;
        const isHost = user.roles?.some(role =>
          role.name.toUpperCase() === 'HOST' || role.name.toUpperCase() === 'ROLE_HOST'
        );

        if (isHost) {
          return true;
        } else {
          console.warn('Access denied: User is not a HOST');
          return router.createUrlTree(['/'], {
            queryParams: { error: 'host-required' }
          });
        }
      } else {
        authService.logout();
        return router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
    }),
    catchError(error => {
      console.error('Error validando usuario HOST:', error);
      authService.logout();
      return of(router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      }));
    })
  );
};

