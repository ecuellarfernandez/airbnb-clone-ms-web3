import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@features/auth/domain/services/auth.service';

/**
 * Guard que protege rutas que requieren autenticación.
 * Verifica si existe un token válido en localStorage.
 * Si no hay token, redirige al usuario a la página de login.
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

 
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = authService.getToken();
  
  if (token) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
};
