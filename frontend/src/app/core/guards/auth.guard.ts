import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@features/auth/domain/services/auth.service';

/**
 * Guard que protege rutas que requieren autenticación.
 * Si no hay token, redirige automáticamente a /auth/login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar directamente si existe el token en localStorage
  const token = authService.getTokenFromStorage();
  if (token) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/auth/login']);
  return false;
};
