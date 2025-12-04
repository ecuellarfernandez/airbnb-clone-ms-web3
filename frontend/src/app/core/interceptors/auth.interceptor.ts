import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@features/auth/domain/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if(req.url.includes('cloudinary.com')) {
    return next(req);
  }

  const token = authService.getToken();

  // Si existe token y la petición es hacia nuestra API, agregar el header Authorization
  if (token && !req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
