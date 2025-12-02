import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { map, catchError, of } from 'rxjs';

/**
 * Guard que protege rutas administrativas.
 * Requiere que el usuario esté autenticado y tenga el rol ADMIN.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si hay token primero - usar getTokenFromStorage() para leer directamente del localStorage
  const token = authService.getTokenFromStorage();
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Obtener el usuario actual y verificar si tiene rol de ADMIN
  return authService.getCurrentUser().pipe(
    map(response => {
      if (response.success && response.data) {
        const hasAdminRole = authService.hasRole(response.data, 'ADMIN');
        
        if (hasAdminRole) {
          return true;
        }
      }
      
      // Si no es admin, redirigir a home
      router.navigate(['/']);
      return false;
    }),
    catchError((error) => {
      console.error('Error verifying admin role:', error);
      // Si el token es inválido, hacer logout y redirigir
      authService.logout();
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
