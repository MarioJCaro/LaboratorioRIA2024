import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();
  if (!user || authService.isTokenExpired()) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRoles = route.data['roles'] as Array<string>;
  if (expectedRoles.includes(user.role)) {
    return true;
  } else {
    // Redirigir según el rol del usuario
    if (user.role === 'ADMIN') {
      // Hacemos next ya que puede acceder a cualquier ruta
      return true;
    } else if (user.role === 'PANADERO') {
      router.navigate(['/ordenes']);
    } else if (user.role === 'USER') {
      router.navigate(['/catalogo']);
    }
    return false;
  }
};
