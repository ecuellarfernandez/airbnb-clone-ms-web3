import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Guard que protege rutas que requieren autenticación.
 * Verifica si existe un token y valida su autenticidad con el backend.
 * Si no hay token o el token es invalido, redirige al usuario a la página de login.
 */
export const authGuard: CanActivateFn = (
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

  // Si no hay token, redirigir inmediatamente al login
  if (!token) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // Si ya tenemos un usuario en memoria, permitir acceso
  const currentUser = authService.getUser();
  if (currentUser) {
    return true;
  }

  // Validar el token con el backend obteniendo el usuario actual
  return authService.getCurrentUser().pipe(
    map(response => {
      if (response.success && response.data) {
        return true;
      } else {
        authService.logout();
        return router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
    }),
    catchError(error => {
      console.error('Error validando token:', error);
      authService.logout();
      return of(router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      }));
    })
  );
};
