import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { map, catchError, of, Observable } from 'rxjs';

/**
 * Guard que protege rutas administrativas.
 * Requiere que el usuario esté autenticado y tenga el rol ADMIN.
 * Si no tiene el rol, redirige al home.
 * Si no está autenticado, redirige al login.
 */
export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Si estamos en SSR, permitir el acceso (el cliente validará)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Verificar si hay token primero
  const token = authService.getToken();
  
  if (!token) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  
  return authService.getCurrentUser().pipe(
    map(response => {
      if (response.success && response.data) {
        const hasAdminRole = authService.hasRole(response.data, 'ADMIN');
        
        if (hasAdminRole) {
          return true;
        }
      }
      
      // Si no es admin, redirigir a home usando UrlTree
      return router.createUrlTree(['/']);
    }),
    catchError((error) => {
      console.error('Error verifying admin role:', error);
      // Si el token es inválido, hacer logout y redirigir
      authService.logout();
      return of(router.createUrlTree(['/auth/login']));
    })
  );
};
