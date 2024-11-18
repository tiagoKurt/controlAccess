import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../../services/auth/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticado) {
    return true;
  } else {
    alert('Você não está autenticado!')
    router.navigate(['/login']);
    return false;
  }
};
